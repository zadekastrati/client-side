"use client";
import { useState, useEffect } from "react";
import Card from "../components/card/page";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    categoryId: "",
    location: "",
    photo: null,
  });

  const fetchEvents = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:5001/api/events/category/${categoryId}`
        : `http://localhost:5001/api/events`;

      const res = await fetch(url);
      const result = await res.json();
      if (result.success) {
        setEvents(result.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/categories");
        const result = await res.json();
        if (result.success) {
          setCategories(result.data || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
    fetchEvents();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "all") {
      fetchEvents();
    } else {
      const selected = categories.find(
        (c) => (c.name || "").toLowerCase() === selectedCategory
      );
      if (selected) {
        fetchEvents(selected.id);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({
        ...prev,
        photo: files && files[0] ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      price: "",
      categoryId: "",
      location: "",
      photo: null,
    });
  };

  const openAddModal = () => {
    resetFormData();
    setEditingEvent(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.name || "",
      description: event.description || "",
      date: event.date ? event.date.split("T")[0] : "",
      price: event.price || "",
      categoryId: event.categoryId || event.category?.id || "",
      location: event.location || "",
      photo: null,
    });
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    resetFormData();
    setEditingEvent(null);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("date", formData.date);
      form.append("price", formData.price);
      form.append("categoryId", formData.categoryId);
      form.append("location", formData.location);
      if (formData.photo) form.append("photo", formData.photo);

      const res = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        closeModals();
        fetchEvents();
      } else {
        alert("Failed to add event: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event, check console for details.");
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("date", formData.date);
      form.append("price", formData.price);
      form.append("categoryId", formData.categoryId);
      form.append("location", formData.location);
      if (formData.photo) form.append("photo", formData.photo);

      const res = await fetch(
        `http://localhost:5001/api/events/${editingEvent.id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      const data = await res.json();
      if (data.success) {
        closeModals();
        fetchEvents();
      } else {
        alert("Failed to update event: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event, check console for details.");
    }
  };

  const handleDeleteClick = async (event) => {
    if (!confirm(`Are you sure you want to delete the event "${event.name}"?`))
      return;

    try {
      const res = await fetch(`http://localhost:5001/api/events/${event.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchEvents();
      } else {
        alert("Failed to delete event: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event, check console for details.");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (event.category?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (event.location || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40">
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-zinc-900 mb-4">
              Discover Events
            </h1>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="block w-full max-w-xl mx-auto rounded-full border-0 px-6 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600 text-base"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Upcoming Events
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openAddModal}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition"
              >
                + Add Event
              </button>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="min-w-[160px] rounded-lg border-0 py-2.5 pl-4 pr-8 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-zinc-600 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={(cat.name || "").toLowerCase()}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-zinc-600">Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-center text-zinc-600">
              No events found for this search.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
              {filteredEvents.map((event, index) => (
                <Card
                  key={event.id || index}
                  title={event.name}
                  description={event.description}
                  photoUrl={event.photoUrl}
                  price={event.price}
                  date={event.date ? event.date.split("T")[0] : ""}
                  location={event.location}
                  link={`/events/${event.id}`}
                  onEdit={() => handleEditClick(event)}
                  onDelete={() => handleDeleteClick(event)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Event Modal */}
        {isAddModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModals}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full"
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-md bg-gray-300 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {isEditModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModals}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
              <form onSubmit={handleUpdateEvent} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full"
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-md bg-gray-300 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
