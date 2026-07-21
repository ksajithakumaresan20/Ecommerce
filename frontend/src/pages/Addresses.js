import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import AddressCard from "../components/AddressCard";
import "../Styles/Addresses.css";

export default function Addresses() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const fetchAddresses = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setAddresses(data);
    }

    setLoading(false);
  };




  const deleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchAddresses();
    } else {
      alert("Failed to delete address");
    }
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Addresses</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-address")}
        >
          + Add Address
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center mt-5">

          <h4>No Address Found</h4>

          <p className="text-muted">
            Click below to add your first address.
          </p>

          <button
            className="btn btn-success"
            onClick={() => navigate("/add-address")}
          >
            Add Address
          </button>

        </div>
      ) : (
        <div className="row">

          {addresses.map((address) => (
            <div className="col-lg-6 mb-4" key={address.id}>

              <AddressCard
                address={address}
                onDelete={deleteAddress}
              />

            </div>
          ))}

        </div>
      )}

    </div>
  );
}