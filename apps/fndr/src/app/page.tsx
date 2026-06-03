"use client";

import React, { useState, useEffect } from "react";
import { Section, Typography, Card } from "@workspace/ui";
import { KeywordInput } from "../components/KeywordInput";
import { AnalysisButton } from "../components/AnalysisButton";
import { LeadTable, Lead } from "../components/LeadTable";

export default function Page() {
  const [keywords, setKeywords] = useState<string[]>([
    "SaaS",
    "AI",
    "Next.js",
    "Leads",
  ]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Stats calculation
  const totalLeads = leads.length;
  const analyzedLeads = leads.filter(
    (l) => l.status === "analyzed" || l.aiAnalysis,
  ).length;
  const highIntentLeads = leads.filter(
    (l) => l.aiAnalysis?.intent === "high",
  ).length;
  const averageRelevance =
    leads.length > 0
      ? Math.round(
          leads.reduce((acc, l) => acc + (l.relevanceScore || 0), 0) /
            leads.length,
        )
      : 0;

  const [discovering, setDiscovering] = useState(false);

  const handleDiscovery = async () => {
    if (keywords.length === 0 || discovering) return;

    setDiscovering(true);
    try {
      const response = await fetch('/apps/fndr/api/discovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token',
        },
        body: JSON.stringify({ keywords }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Discovery failed');
      }

      console.log('[Dashboard] Discovery completed:', result);
      await fetchLeads(); // Refresh the list
    } catch (error) {
      console.error('[Dashboard] Error during discovery:', error);
    } finally {
      setDiscovering(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/apps/fndr/api/leads', {
        headers: {
          'Authorization': 'Bearer admin-token',
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        setLeads(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Mock data for immediate visualization if no leads are in DB
  useEffect(() => {
    // We removed hardcoded mock data to ensure we show actual results from the database.
    // If you see no leads, please click "Start Discovery" with your target keywords.
  }, [loading, leads.length]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-primary/30">
      <Section containerSize="xl" className="py-12 md:py-20">
        <div className="flex flex-col gap-12">
          {/* Header & Title */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-2">
              <Typography
                variant="label"
                className="text-brand-primary tracking-[0.3em] uppercase text-xs font-black"
              >
                Lead Intelligence System
              </Typography>
              <Typography as="h1" variant="hero">
                FN
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-700 to-blue-400 italic">
                  DR
                </span>
                {/* <span className="text-brand-primary">.</span> */}
              </Typography>
              <Typography
                variant="subtitle"
                className="max-w-xl text-zinc-400 mt-4"
              >
                The high-performance engine for discovery, analysis, and
                conversion.
              </Typography>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <Typography variant="label" className="text-zinc-500 mb-0">
                  System Status
                </Typography>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <Typography className="text-white font-bold text-sm">
                    Operational
                  </Typography>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Summary - Modular Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card
              padding="lg"
              bordered
              className="bg-zinc-900/50 border-zinc-800 hover:border-brand-primary/30 transition-colors"
            >
              <Typography variant="label" className="text-zinc-500">
                Total Leads
              </Typography>
              <Typography className="text-4xl font-black mt-2">
                {totalLeads}
              </Typography>
            </Card>
            <Card
              padding="lg"
              bordered
              className="bg-zinc-900/50 border-zinc-800 hover:border-brand-primary/30 transition-colors"
            >
              <Typography variant="label" className="text-zinc-500">
                Analyzed
              </Typography>
              <Typography className="text-4xl font-black mt-2 text-brand-primary">
                {analyzedLeads}
              </Typography>
            </Card>
            <Card
              padding="lg"
              bordered
              className="bg-zinc-900/50 border-zinc-800 hover:border-brand-primary/30 transition-colors"
            >
              <Typography variant="label" className="text-zinc-500">
                High Intent
              </Typography>
              <Typography className="text-4xl font-black mt-2 text-green-400">
                {highIntentLeads}
              </Typography>
            </Card>
            <Card
              padding="lg"
              bordered
              className="bg-zinc-900/50 border-zinc-800 hover:border-brand-primary/30 transition-colors"
            >
              <Typography variant="label" className="text-zinc-500">
                Avg. Relevance
              </Typography>
              <Typography className="text-4xl font-black mt-2">
                {averageRelevance}%
              </Typography>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Input & Control Section */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <Card
                padding="lg"
                bordered
                className="border-zinc-800 bg-zinc-900/30 rounded-3xl sticky top-8"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Typography variant="title" className="text-2xl">
                      Configuration
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-zinc-500 text-sm"
                    >
                      Adjust your target keywords and run analysis on selected
                      leads.
                    </Typography>
                  </div>

                  <KeywordInput
                    value={keywords}
                    onChange={setKeywords}
                    placeholder="Add target keyword..."
                  />

                  <button
                    onClick={handleDiscovery}
                    disabled={discovering || keywords.length === 0}
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest bg-brand-primary text-black hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {discovering ? "Discovering..." : "Start Discovery"}
                  </button>

                  <div className="pt-8 border-t border-zinc-800 flex flex-col gap-4">
                    <Typography variant="label">Selection Actions</Typography>
                    <AnalysisButton
                      leadIds={selectedIds}
                      onSuccess={fetchLeads}
                      className="w-full py-4 rounded-xl font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all"
                    />
                    <Typography
                      variant="body"
                      className="text-[10px] text-zinc-500 text-center uppercase tracking-tighter"
                    >
                      {selectedIds.length} leads selected for analysis
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Typography variant="title" className="text-3xl">
                    Live Feed
                  </Typography>
                  <Typography variant="body" className="text-zinc-500">
                    Real-time lead streams from LinkedIn and Reddit.
                  </Typography>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Live
                  </span>
                </div>
              </div>

              <LeadTable
                leads={leads}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
