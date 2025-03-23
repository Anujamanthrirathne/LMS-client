import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { useGetAllResourcesQuery } from "@/redux/features/resources/resourceApi";
import ResourceCard from "../ResourceCard/ResourceCard";

type Resource = {
  _id: string;
  name: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnailUrl: string;
  category: string;
  downloadedCount: number;
  links: string[];
};

const Resources = () => {
    const { data, isLoading } = useGetAllResourcesQuery({});
    const [resources, setResources] = useState<Resource[]>([]); // ✅ Define type properly

    useEffect(() => {
        console.log("Fetched data:", data); // Debugging Log
    
        if (data && Array.isArray(data)) {
            setResources(data); // ✅ Set the full array
        } else {
            console.warn("No resources found or incorrect response format.");
        }
    }, [data]);
    
    

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-[90%] 800px:w-[80%] m-auto">
                    <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                        Explore Resources{" "}
                        <span className="text-gradient">Breathtaking Resources</span>
                        <br />
                        Discover Hidden Issues <span className="text-gradient">Click Resources</span>
                    </h1>
                    <br />
                    <br />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.length > 0 ? (
                            resources.map((res) => (
                                <ResourceCard key={res._id} resource={res} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600 dark:text-gray-300">
                                No resources available.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Resources;
