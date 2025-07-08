"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Citation = {
  text: string;
  source: string;
  link: string;
};

type ApiResponse = {
  answer: string;
  citations: Citation[];
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(
    "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?"
  );
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockResponse: ApiResponse = {
        answer:
          "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
        citations: [
          {
            text: "As the age of the deceased at the time of accident was held to be about 54–55 years...",
            source: "Dani_Devi_v_Pritam_Singh.pdf",
            link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
          },
        ],
      };
      setResponse(mockResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Lexi Legal Assistant</h1>
      <Textarea
        placeholder="Ask a legal question..."
        className="min-h-[120px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 cursor-pointer"
      >
        {loading ? "Generating Answer..." : "Submit"}
      </Button>
      {response && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{response.answer}</p>
            {response.citations.map((c, index) => (
              <div
                key={index}
                onClick={() => window.open(c.link, "_blank")}
                className="text-sm text-blue-600 underline cursor-pointer"
              >
                {c.text} – <strong>{c.source}</strong>{" "}
                <span className="italic">(opens at Paragraph 7)</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
