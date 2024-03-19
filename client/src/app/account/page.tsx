"use client";

import useLogout from "@/hooks/useLogout";
import useUpdateUser from "@/hooks/useUpdateUser";
import { UserType } from "@/types/types";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAvatar(user.avatar || null);
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { update } = useUpdateUser();

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    let data: UserType = {
      ...user,
      name: name,
      email: email,
      phone: phone,
      avatar: avatar,
    };

    if (password) {
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return;
      }

      data = {
        ...data,
        password: password,
      };
    }
    console.log("data", data);
    update(data);
  };

  const logout = useLogout();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form className="flex flex-col justify-center items-center gap-2">
        {avatar && (
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <label className="w-full input input-bordered flex items-center gap-2">
          Avatar
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          Phone No.
          <input
            type="phone"
            placeholder="phone no"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          Confirm Password
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <div className="flex gap-2 mt-6">
          <button className="btn btn-primary w-20" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn bg-base-100 w-20" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
