import React, { useState } from "react";

/**
 * CustomOrderForm.jsx — 4GeekMeNot
 * --------------------------------------------------------------
 * DTF / All-over print intake form.
 * - Cloudinary uploads (unsigned)
 * - Google Sheets + Apps Script webhook
 * - CORS-safe header fix included
 */

const CLOUDINARY_CLOUD_NAME = "dnwe4h1i8"; // your actual cloud name
const CLOUDINARY_UNSIGNED_PRESET = "unsigned_dtf"; // your unsigned preset
const GAS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzIel_qStEaWzARLw-zBh1DLgRZID4OsVQXepgBtDr2M-0NejKnTNz0bxgmTUGKkTMltQ/exec"; // your Apps Script web app URL

const MAX_FILES = 6;
const MAX_FILE_MB = 20;

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

export default function CustomOrderForm() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project_title: "",
    placement: [],
    print_method: "DTF",
    shirt_colors: "",
    sizes: "",
    quantity: "",
    deadline: "",
    flexible_budget: "",
    design_notes: "",
    honey: "",
  });

  const placements = [
    "Front",
    "Back",
    "Left Sleeve",
    "Right Sleeve",
    "Hem Wrap",
    "Neck Tag",
    "All-Over (AOP)",
  ];

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onCheck(e) {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      placement: checked
        ? Array.from(new Set([...prev.placement, value]))
        : prev.placement.filter((p) => p !== value),
    }));
  }

  async function handleUpload(localFiles) {
    setError("");
    if (!localFiles?.length) return [];

    const filesArr = Array.from(localFiles).slice(0, MAX_FILES);
    for (const f of filesArr) {
      if (f.size / (1024 * 1024) > MAX_FILE_MB) {
        throw new Error(`File "${f.name}" exceeds ${MAX_FILE_MB}MB limit.`);
      }
    }

    setUploading(true);
    try {
      const urls = [];
      for (const file of filesArr) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", CLOUDINARY_UNSIGNED_PRESET);
        fd.append("folder", "4geekmenot/custom-orders");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: fd,
          }
        );
        if (!res.ok) throw new Error("Upload failed.");
        const data = await res.json();
        urls.push(data.secure_url);
      }
      return urls;
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.honey) return; // bot caught

    if (!form.name || !form.email || !form.project_title) {
      setError("Name, email, and project title are required.");
      return;
    }

    let upload_urls = [];
    try {
      if (files.length) {
        upload_urls = await handleUpload(files);
      }
    } catch (err) {
      setError(err.message || "Upload error.");
      return;
    }

    const payload = {
      ...form,
      placement: form.placement.join(", "),
      upload_urls: upload_urls.join(" | "),
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch(GAS_WEBHOOK_URL, {
        method: "POST",
        // CORS-safe header
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed.");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        project_title: "",
        placement: [],
        print_method: "DTF",
        shirt_colors: "",
        sizes: "",
        quantity: "",
        deadline: "",
        flexible_budget: "",
        design_notes: "",
        honey: "",
      });
      setFiles([]);
    } catch (err) {
      setError(err.message || "Submission error.");
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Thanks! 🎉</h2>
        <p className="mt-2">
          We got your request. You’ll receive a confirmation email shortly.
        </p>
        <button
          className="mt-6 rounded-xl border px-4 py-2"
          onClick={() => setSubmitted(false)}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-3xl space-y-6 rounded-2xl border p-6 shadow-sm"
    >
      <header>
        <h1 className="text-3xl font-bold">Custom Design Intake</h1>
        <p className="mt-1 text-sm text-gray-600">
          DTF • All-over print • Sleeve/hem wraps. Send refs + details and we’ll
          get you a clean quote.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          Name*
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Email*
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          Project title*
          <input
            name="project_title"
            value={form.project_title}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            required
            placeholder="e.g., 'All-over wrap: ATL Boarding Pass'"
          />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 font-medium">
          Placement (select all that apply)
        </legend>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {placements.map((p) => (
            <label
              key={p}
              className={classNames(
                "flex items-center gap-2 rounded-xl border px-3 py-2",
                form.placement.includes(p) && "border-gray-900"
              )}
            >
              <input
                type="checkbox"
                value={p}
                checked={form.placement.includes(p)}
                onChange={onCheck}
              />{" "}
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          Print method
          <select
            name="print_method"
            value={form.print_method}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
          >
            <option>DTF</option>
            <option>UV DTF (stickers)</option>
            <option>Screen Print</option>
            <option>Embroidery</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          Shirt/base colors
          <input
            name="shirt_colors"
            value={form.shirt_colors}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            placeholder="e.g., black, sand, heather"
          />
        </label>
        <label className="flex flex-col gap-1">
          Sizes
          <input
            name="sizes"
            value={form.sizes}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            placeholder="S:10, M:12, L:8, XL:4…"
          />
        </label>
        <label className="flex flex-col gap-1">
          Quantity
          <input
            name="quantity"
            value={form.quantity}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            placeholder="e.g., 24"
          />
        </label>
        <label className="flex flex-col gap-1">
          Deadline
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          Flexible budget (USD)
          <input
            name="flexible_budget"
            value={form.flexible_budget}
            onChange={onChange}
            className="rounded-xl border px-3 py-2"
            placeholder="Optional"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        Design notes
        <textarea
          name="design_notes"
          value={form.design_notes}
          onChange={onChange}
          className="min-h-[120px] rounded-xl border px-3 py-2"
          placeholder="Describe the theme, colors, wrap placement, etc."
        ></textarea>
      </label>

      <div className="hidden">
        <input name="honey" value={form.honey} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">
          Upload art / references (max {MAX_FILES} files, up to {MAX_FILE_MB}MB each)
        </label>
        <input
          type="file"
          accept="image/*,application/pdf,.ai,.psd,.svg,.eps"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        {files?.length > 0 && (
          <p className="text-sm text-gray-600">
            Selected: {Array.from(files).map((f) => f.name).join(", ")}
          </p>
        )}
      </div>

      <button
        disabled={uploading}
        type="submit"
        className="w-full rounded-2xl bg-black px-4 py-3 font-medium text-white shadow-sm disabled:opacity-60"
      >
        {uploading ? "Uploading…" : "Submit request"}
      </button>

      <p className="text-center text-xs text-gray-500">
        By submitting, you agree to be contacted about your project.
      </p>
    </form>
  );
}
