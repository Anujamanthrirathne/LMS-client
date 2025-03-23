import React, { FC, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useAddUserMutation,
} from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { styles } from "@/app/styles/style";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser] = useDeleteUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUserRole] = useAddUserMutation();

  const [openRoleUpdateDialog, setOpenRoleUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [userId, setUserId] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // Handle role update
  const handleRoleUpdate = async () => {
    try {
      const response = await updateUserRole({
        id: userId,
        role: newRole,
      }).unwrap();
      if (response.success) {
        toast.success(`Role updated to ${newRole} for user!`);
        setOpenRoleUpdateDialog(false);
        refetch();
      } else {
        toast.error("Failed to update role.");
      }
    } catch (error) {
      console.error("Update role error:", error);
      toast.error("Error updating role.");
    }
  };

  // Handle user addition
  const handleAddUser = async () => {
    try {
      const response = await addUser({ email, role: newRole }).unwrap();
      if (response.success) {
        toast.success("New user added successfully!");
        setOpenAddUserDialog(false);
        refetch();
      } else {
        toast.error("Failed to add new user.");
      }
    } catch (error) {
      console.error("Add user error:", error);
      toast.error("Error adding user.");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
      setOpenDeleteDialog(false);
      refetch();
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  // Generate PDF Report
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
    doc.text("USERS INVOICE", 145, 20);

    // Invoice Details (Right aligned)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`User Details #: INV-20240318`, 150, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 38);

    // Line Separator
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);

    // Company & Billing Info - Properly Aligned
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CEO ELearning:", 15, 55);
    doc.setFont("helvetica", "normal");
    doc.text("Anuja Manthrirathne", 15, 63);
    doc.text("456, Pussella, Rathnapura, Sri Lanka", 15, 70);
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
        3: { cellWidth: 25 }, // Role
        4: { cellWidth: 35 }, // Courses Purchased
        5: { cellWidth: 30 }, // Joined At (Fixed Space)
      },
      head: [["ID", "Name", "Email", "Role", "Courses Purchased", "Joined At"]],
      body: rows.map((row: any) => [
        row.id,
        row.name,
        row.email,
        row.role,
        row.courses,
        row.created_at,
      ]),
      theme: "grid",
    });

    // ✅ FIXED: Manually calculate finalY instead of lastAutoTable
    const finalY = doc.internal.pageSize.height - 50;

    // Total Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Users:", 140, finalY);
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

    doc.save("invoice.pdf");
  };

  // Filter rows based on `isTeam` flag
  const filteredUsers =
    data?.users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const rows = filteredUsers
    .filter((user: any) => (isTeam ? user.role === "admin" : true))
    .map((user: any, index: number) => ({
      id: `us-${index + 1}`, // Generates "us-1", "us-2", etc.
      name: user.name,
      email: user.email,
      role: user.role,
      courses: user.courses.length,
      created_at: format(user.createdAt),
    }));

  //id: user._id, = mongo db actual id

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "roleAction",
      headerName: "Update Role",
      flex: 0.4,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setUserId(params.row.id);
            setNewRole(params.row.role);
            setOpenRoleUpdateDialog(true);
          }}
        >
          Update Role
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete User",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpenDeleteDialog(true);
            setUserId(params.row.id);
          }}
          style={{
            minWidth: "40px",
            height: "40px",
            backgroundColor: "transparent",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AiOutlineDelete
            size={20}
            style={{
              color: "red",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
              e.currentTarget.style.color = "#b30000"; // Darker red on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "red"; // Original red
            }}
          />
        </Button>
      ),
    },

    {
      field: "emailAction",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <AiOutlineMail size={20} />
        </a>
      ),
    },
  ];

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[200px] dark:bg-[#282963] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                onClick={() => setOpenAddUserDialog(true)}
              >
                Add New User
              </div>
            </div>
          )}

          {!isTeam && (
            <>
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
            </>
          )}

          <Box m="40px 0 0 0" height="80vh">
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  color: theme === "dark" ? "black" : "black", // Black header text for dark mode
                  backgroundColor: theme === "dark" ? "white" : "black", // Header background
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "white" : "black",
                },
                "& .MuiDataGrid-cell": {
                  borderColor: theme === "dark" ? "#4a4a4a" : "#e0e0e0", // Adjusting borders
                },
              }}
            />
          </Box>
        </Box>
      )}

      {/* Role Update Dialog */}

      <Dialog
        open={openRoleUpdateDialog}
        onClose={() => setOpenRoleUpdateDialog(false)}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #6A11CB, #2575FC)",
            color: "white",
          }}
        >
          Update User Role
        </DialogTitle>
        <DialogContent
          style={{
            background: "linear-gradient(180deg, #6A11CB, #2575FC)",
            padding: "20px",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <FormControl fullWidth margin="normal">
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          style={{
            background: "linear-gradient(90deg, #2575FC, #6A11CB)",
            padding: "10px",
          }}
        >
          <Button
            onClick={() => setOpenRoleUpdateDialog(false)}
            style={{
              backgroundColor: "#F0F0F0",
              color: "#2575FC",
              textTransform: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F0F0";
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRoleUpdate}
            style={{
              backgroundColor: "#34C759",
              color: "white",
              textTransform: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#28A745";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#34C759";
            }}
          >
            Update Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              transition: "all 0.3s ease",
              textTransform: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#007BFF";
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            style={{
              backgroundColor: "#DC3545",
              color: "white",
              transition: "all 0.3s ease",
              textTransform: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c82333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#DC3545";
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog
        open={openAddUserDialog}
        onClose={() => setOpenAddUserDialog(false)}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #6A11CB, #2575FC)",
            color: "white",
          }}
        >
          Add New User
        </DialogTitle>
        <DialogContent
          style={{
            background: "linear-gradient(180deg, #6A11CB, #2575FC)",
            padding: "20px",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: {
                color: "#E0E0E0",
              },
            }}
            inputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "10px",
                color: "black",
              },
            }}
            style={{
              marginBottom: "16px",
            }}
          />
          <FormControl
            fullWidth
            margin="normal"
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "8px",
                color: "black",
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          style={{
            background: "linear-gradient(90deg, #2575FC, #6A11CB)",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setOpenAddUserDialog(false)}
            style={{
              backgroundColor: "#F0F0F0",
              color: "#2575FC",
              textTransform: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F0F0";
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            style={{
              backgroundColor: "#34C759",
              color: "white",
              textTransform: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#28A745";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#34C759";
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;
