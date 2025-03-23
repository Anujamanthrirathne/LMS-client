import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Importing GridColDef to type columns
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// Define a type for the course data
type Course = {
  _id: string;
  name: string;
  ratings: number;
  purchased: number;
  createdAt: string;
};

const AllCourses = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState<string>("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Define the columns with proper types
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: { row: { id: string } }) => {
        return (
          <div className="flex justify-center items-center h-full">
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2
                className="dark:text-white text-black cursor-pointer"
                size={20}
              />
            </Link>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: { row: { id: string } }) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
  ];

  // Define a type for rows to ensure proper typing

  // Populate rows with type-safe data
  const filteredCourses =
    data?.courses?.filter((course: Course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const rows = filteredCourses.map((item: Course, index: number) => ({
    id: `cs-${index + 1}`,
    title: item.name,
    ratings: item.ratings,
    purchased: item.purchased,
    created_at: format(item.createdAt),
  }));

  const getBase64ImageFromURL = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load logo
    const imageUrl =
      "https://th.bing.com/th/id/OIP.P1tCh-O3o_SWiGxh2NgxAgHaDQ?rs=1&pid=ImgDetMain";

    try {
      const logoBase64 = await getBase64ImageFromURL(imageUrl);
      doc.addImage(logoBase64, "PNG", 15, 10, 40, 20); // Logo left
    } catch (error) {
      console.error("Error loading image:", error);
    }

    // Invoice Title (Right aligned)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("COURSE INVOICE", 135, 20);

    // Invoice Details (Right aligned)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Course Details #: INV-20240318`, 140, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 38);

    // Line Separator
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);

    // Company & Billing Info - Properly Aligned
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CEO ELearning:", 15, 55);
    doc.setFont("helvetica", "normal");
    doc.text("Anuja Manthrirathne", 15, 63);
    doc.text("456, Pussella Rathanpura , Sri Lanka", 15, 70);
    doc.text("Phone: 0772029251 | Email: Anuja@example.com", 15, 78);

    doc.setFont("helvetica", "bold");
    doc.text("ELearning Pvt Ltd", 120, 55); // Shifted for proper alignment
    doc.setFont("helvetica", "normal");
    doc.text("123, Main Street, Colombo, Sri Lanka", 120, 63);
    doc.text("Phone: 0772029251", 120, 70);
    doc.text("Email: contact@elearning.com", 120, 78);

    // Table Styling with Fixed Column Widths
    autoTable(doc, {
      startY: 90,
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Alternate row color
      styles: {
        fontSize: 10,
        cellPadding: 5,
        valign: "middle",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 15 }, // ID
        1: { cellWidth: 35 }, // Name (Enough Space)
        2: { cellWidth: 50 }, // Email (More Space)
        3: { cellWidth: 45 }, // Role
        4: { cellWidth: 35 }, // Courses Purchased
        5: { cellWidth: 30 }, // Joined At (Fixed Space)
      },
      head: [
        ["ID", "Course Name", "Ratings", "c_Purchased", "Course CreatedBy"],
      ],
      body: rows.map((row: any) => [
        row.id,
        row.title,
        row.ratings,
        row.purchased,
        row.created_at,
      ]),
      theme: "grid",
    });

    // ✅ FIXED: Manually calculate finalY instead of lastAutoTable
    const finalY = doc.internal.pageSize.height - 50;

    // Total Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Course:", 140, finalY);
    doc.text(`${rows.length}`, 180, finalY);

    // Footer Section
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your business!", 15, 280);
    doc.text("For inquiries, contact support@elearning.com", 15, 285);

    // ✅ FIXED: Correctly Get Page Count
    const pageCount = (doc as any).internal.getNumberOfPages?.() || 1; // Type-safe fallback
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
    }

    doc.save("course.pdf");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deleteCourse(courseId);
  };

  return (
    <div className="mt-[120px]">
      <div className="w-full flex justify-end">
        <button
          className={`${styles.button} !w-[200px] dark:bg-[#282963] !h-[35px] dark:border dark:border-[#ffffff6c]`}
          onClick={generatePDF}
        >
          Download PDF Report
        </button>
      </div>
      <div className="w-full flex justify-start mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px] px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
               placeholder-gray-500 dark:placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
               ml-4" // Added margin-left to push it slightly to the right
        />
      </div>
      <Box m="20px">
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark" ? "#3e4396 !important" : "#A4A9FC",
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                color: theme === "dark" ? "#9C27B0" : "#000",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#A4A9FC",
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc !important",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        )}
        

        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
              <h1 className={`${styles.title} mb-6 text-center`}>
                Are you sure you want to delete this course?
              </h1>
              <div className="flex w-full items-center justify-between mt-8">
                <div
                  className={`${styles.button} !w-[120px] h-[40px] bg-[#57c7a3] hover:bg-[#45a98c] text-white rounded-md cursor-pointer`}
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} !w-[120px] h-[40px] bg-[#d63f3f] hover:bg-[#b83232] text-white rounded-md cursor-pointer`}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default AllCourses;
