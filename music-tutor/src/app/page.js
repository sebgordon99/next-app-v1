"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music } from "lucide-react";

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

export default function App() {
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
                {[
                  "Guitar",
                  "Piano",
                  "Voice",
                  "Drums",
                  "Violin",
                ].map((i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" /> {i}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <section className="col-span-12 md:col-span-9 space-y-4">
          <div className="flex gap-4">
            <Input placeholder="Search by name, instrument, or description" />
            <Select defaultValue="highest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">{tutors.length} tutors found</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutors.map((tutor) => (
              <Card key={tutor.id} className="overflow-hidden">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{tutor.name}</h3>
                    <Badge>⭐ {tutor.rating}</Badge>
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
                    <Button size="sm">Contact</Button>
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
