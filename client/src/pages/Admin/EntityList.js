import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import { 
  FaTrash, 
  FaUser, 
  FaHospital, 
  FaBuilding,
  FaHandHoldingMedical
} from "react-icons/fa";

const EntityList = ({ entityType }) => {
  const [data, setData] = useState([]);
  
  // Configuration based on entity type
  const entityConfig = {
    donor: {
      title: "Donor Records",
      icon: <FaHandHoldingMedical className="text-primary" />,
      fetchEndpoint: "/admin/donar-list",
      dataKey: "donarData",
      nameField: "name",
      initialLetter: (record) => (record.name?.charAt(0) || "?").toUpperCase(),
      displayName: (record) => record.name,
      deleteEndpoint: "/admin/delete-donar"
    },
    hospital: {
      title: "Hospital Records",
      icon: <FaHospital className="text-primary" />,
      fetchEndpoint: "/admin/hospital-list",
      dataKey: "hospitalData",
      nameField: "hospitalName",
      initialLetter: (record) => record.hospitalName?.charAt(0)?.toUpperCase() || "H",
      displayName: (record) => record.hospitalName,
      deleteEndpoint: "/admin/delete-hospital"
    },
    organization: {
      title: "Organization Records",
      icon: <FaBuilding className="text-primary" />,
      fetchEndpoint: "/admin/org-list",
      dataKey: "orgData",
      nameField: "organisationName",
      initialLetter: (record) => record.organisationName?.charAt(0)?.toUpperCase() || "O",
      displayName: (record) => record.organisationName,
      deleteEndpoint: "/admin/delete-org"
    }
  };
  
  const config = entityConfig[entityType];
  
  // Fetch data based on entity type
  const fetchData = async () => {
    try {
      const { data } = await API.get(config.fetchEndpoint);
      if (data?.success) {
        setData(data[config.dataKey]);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error fetching ${entityType} records`);
    }
  };
  
  // Handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await API.delete(`${config.deleteEndpoint}/${id}`);
      if (data?.success) {
        toast.success(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully`);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting ${entityType}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entityType]);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center mb-0">
            {config.icon} {config.title}
          </h1>
        </div>
        
        {data?.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted fs-5">No {entityType} records found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-light align-middle">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '40px', height: '40px' }}>
                          <span className="text-primary fw-bold">
                            {config.initialLetter(record)}
                          </span>
                        </div>
                        <span>{config.displayName(record)}</span>
                      </div>
                    </td>
                    <td>{record.email}</td>
                    <td>{record.phone}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(record._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EntityList;