"use client";

import React from "react";

interface Props {
  title: string;
  value: string | number;
}

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
