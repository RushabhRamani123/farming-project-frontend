import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const storage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (str) {
      return JSON.parse(str);
    }
    return null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useContactStore = create()(
  persist(
    (set) => ({
      userId: 1,
      marketOptin: true,
      Details: [
        {
          name: "fds",
          phone: "75370 00123",
          phoneCode: "+91",
          email: "fds@example.com",
          createdAt: "2023-10-29",
          companyTags: ["Tech"],
          tags: ["VIP"],
        },
        {
          name: "sanyam",
          phone: "87997 18456",
          phoneCode: "+91",
          email: "sanyam@example.com",
          createdAt: "2023-10-20",
          companyTags: ["Finance"],
          tags: ["New"],
        },
        {
          name: "chandresh",
          phone: "97842 05789",
          phoneCode: "+91",
          email: "chandresh@example.com",
          createdAt: "2023-07-29",
          companyTags: ["Healthcare"],
          tags: ["Follow-up"],
        },
        {
          name: "shreyansh shah",
          phone: "62650 81012",
          phoneCode: "+91",
          email: "shreyansh@example.com",
          createdAt: "2023-07-29",
          companyTags: ["Education"],
          tags: ["Potential"],
        },
        {
          name: "j samal",
          phone: "75370 00345",
          phoneCode: "+91",
          email: "jsamal@example.com",
          createdAt: "2022-10-02",
          companyTags: ["Retail"],
          tags: ["Long-term"],
        },
      ],
      addContact: (contact) =>
        set((state) => ({
          Details: [...state.Details, contact],
        })),
      updateContact: (index, updatedContact) =>
        set((state) => ({
          Details: state.Details.map((contact, i) =>
            i === index ? { ...contact, ...updatedContact } : contact
          ),
        })),
      deleteContact: (index) =>
        set((state) => ({
          Details: state.Details.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "contact-store",
      storage: createJSONStorage(() => storage),
    }
  )
);
