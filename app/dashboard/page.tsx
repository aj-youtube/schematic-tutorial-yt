"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreditCardIcon } from "lucide-react";
import { useSchematicEntitlement, useSchematicEvents } from "@schematichq/schematic-react";
import ProgressCard from "@/components/ProgressCard";

const transformText = (text: string, style: string): string => {
  switch (style) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "titlecase":
      return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case "snakecase":
      return text.trim().toLowerCase().replace(/\s+/g, "_");
    default:
      return text;
  }
};

export default function Page() {
    const { user } = useUser();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("uppercase");
  const createGeneration = useMutation(api.generations.createGeneration);

  const handleConvert = () => {
    const result = transformText(inputText, selectedStyle);
    setOutputText(result);

    if (inputText !== "") {
        // Save to Convex
        if (user?.id) {
            createGeneration({
              userId: user.id,
              inputText,
              generationType: selectedStyle,
            });
          }

          track({ event: 'text-generation' })
    } else {
        toast.error("Please enter valid text")
    }

        
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const {
    value: isFeatureEnabled,
    featureUsage,
    featureAllocation,
    featureUsageExceeded,
  } = useSchematicEntitlement("text-generations");
  const { track } = useSchematicEvents();

  const {
    value: isNewBooleanFeatureEnabled,
  } = useSchematicEntitlement("snakecase-formatting");

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">📝 TinyText Formatter</h1>
          <UserButton afterSignOutUrl="/">
          <UserButton.MenuItems>
            <UserButton.Link
            label="Manage subscription"
            labelIcon={<CreditCardIcon className="w-4 h-4" />}
            href="/dashboard/subscription"
            />
          </UserButton.MenuItems>
          </UserButton>
        </div>
        <ProgressCard current={featureUsage!} max={featureAllocation} label="Text Transformations Usage" />
        <Card className="shadow-md border-gray-200">
          <CardHeader>
            <CardTitle>Format Your Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-32"
            />

            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uppercase">UPPERCASE</SelectItem>
                <SelectItem value="lowercase">lowercase</SelectItem>
                <SelectItem value="titlecase">Title Case</SelectItem>
                <SelectItem value="snakecase"  disabled={!isNewBooleanFeatureEnabled}>{isNewBooleanFeatureEnabled ? "snake_case" : "snake_case not included with your current plan. Please upgrade for usage."}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleConvert}
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={!isFeatureEnabled}
            >
              { featureUsageExceeded ? "Upgrade to continue" : "Convert" }
            </Button>

            {outputText && (
              <div className="space-y-2">
                <Textarea value={outputText} readOnly className="h-32" />
                <Button
                  onClick={handleCopy}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
