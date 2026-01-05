"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Star } from "lucide-react";

// ---- Mock data (to be replaced with your API later) ----
const tutors = [
  {
    id: 1,
    name: "James Rodriguez",
    location: "Brunswick",
    instruments: ["Guitar", "Bass Guitar"],
    description: "Professional guitarist with touring experience. Teaching rock, jazz, and contemporary styles.",
    experience: 12,
    rate: 70,
    rating: 5,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
  {
    id: 2,
    name: "Sophie Anderson",
    location: "Hawthorn",
    instruments: ["Voice", "Piano"],
    description: "Vocal coach specializing in musical theatre and contemporary pop.",
    experience: 9,
    rate: 65,
    rating: 5,
    image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf",
  },
];

const ALL_INSTRUMENTS = [
  "Guitar",
  "Bass Guitar",
  "Piano",
  "Voice",
  "Drums",
  "Violin",
];

export default function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("highest");
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const filteredTutors = useMemo(() => {
    let results = tutors.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.instruments.some((i) =>
          i.toLowerCase().includes(search.toLowerCase())
        );

      const matchesInstrument =
        selectedInstruments.length === 0 ||
        selectedInstruments.some((i) => t.instruments.includes(i));

      return matchesSearch && matchesInstrument;
    });

    if (sort === "highest") {
      results.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "lowest") {
      results.sort((a, b) => a.rate - b.rate);
    }

    return results;
  }, [search, sort, selectedInstruments]);

  function toggleInstrument(inst) {
    setSelectedInstruments((prev) =>
      prev.includes(inst)
        ? prev.filter((i) => i !== inst)
        : [...prev, inst]
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <Music className="h-5 w-5" />
            Music Tutor Marketplace
          </div>
          <Button> Tutor Login </Button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl p-6 grid grid-cols-12 gap-6">
        {/* Filters */}
        <aside className="col-span-12 md:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Filters</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium">Instrument</p>
                {ALL_INSTRUMENTS.map((i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedInstruments.includes(i)}
                      onChange={() => toggleInstrument(i)}
                    />
                    {i}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <section className="col-span-12 md:col-span-9 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by name, instrument, or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredTutors.length} tutors found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="overflow-hidden">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{tutor.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {tutor.rating}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">📍 {tutor.location}</p>
                  <div className="flex gap-2 flex-wrap">
                    {tutor.instruments.map((inst) => (
                      <Badge key={inst} variant="secondary">
                        {inst}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm">{tutor.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {tutor.experience} years experience
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-semibold">From ${tutor.rate}/hour</p>
                    <Link href={`/tutor/${tutor.id}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
