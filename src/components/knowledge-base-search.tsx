"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface KnowledgeBaseSearchProps {
  onSearch: (query: string) => void;
}

export function KnowledgeBaseSearch({ onSearch }: KnowledgeBaseSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center space-x-2 mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search articles and FAQs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 text-base"
      />
      <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Search className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
