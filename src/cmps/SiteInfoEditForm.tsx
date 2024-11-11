"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSiteInfo, saveSiteInfo } from "@/services/client-api/siteInfoApi";
import { useState, useEffect } from "react";

const SiteInfoEditForm = () => {
  const [siteInfo, setSiteInfo] = useState({
    site_name: "",
    description: "",
    address: "",
    contact_email: "",
    phone_number: "",
    opening_hours: "",
    meta_title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    og_url: "",
    og_type: "website",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSiteInfo();
      setSiteInfo(data);
    };
    fetchData();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setSiteInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await saveSiteInfo(siteInfo);
    alert("המידע על האתר עודכן בהצלחה");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-customNavy">
        עריכת מידע על האתר
      </h2>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">שם האתר:</label>
        <input
          type="text"
          name="site_name"
          value={siteInfo.site_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">תיאור:</label>
        <textarea
          name="description"
          value={siteInfo.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">כתובת:</label>
        <input
          type="text"
          name="address"
          value={siteInfo.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">אימייל:</label>
        <input
          type="email"
          name="contact_email"
          value={siteInfo.contact_email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          מספר טלפון:
        </label>
        <input
          type="tel"
          name="phone_number"
          value={siteInfo.phone_number}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          שעות פתיחה:
        </label>
        <input
          type="text"
          name="opening_hours"
          value={siteInfo.opening_hours}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Meta Title:
        </label>
        <input
          type="text"
          name="meta_title"
          value={siteInfo.meta_title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Meta Description:
        </label>
        <textarea
          name="meta_description"
          value={siteInfo.meta_description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          OG Title:
        </label>
        <input
          type="text"
          name="og_title"
          value={siteInfo.og_title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          OG Description:
        </label>
        <textarea
          name="og_description"
          value={siteInfo.og_description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">OG URL:</label>
        <input
          type="text"
          name="og_url"
          value={siteInfo.og_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">OG Type:</label>
        <input
          type="text"
          name="og_type"
          value={siteInfo.og_type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-customGreen text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        שמירת שינויים
      </button>
    </form>
  );
};

export default SiteInfoEditForm;