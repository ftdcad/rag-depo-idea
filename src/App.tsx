import React, { useState, useEffect } from 'react';
import { Save, Download, Upload, FileText, AlertCircle, CheckCircle, Copy, RefreshCw } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  instructions: string;
}

function App() {
  const [instructions, setInstructions] = useState('');
  const [activeTemplate, setActiveTemplate] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const characterLimit = 8000;
  const characterCount = instructions.length;
  const isOverLimit = characterCount > characterLimit;
  const warningThreshold = characterLimit * 0.9; // 90% of limit
  const isNearLimit = characterCount > warningThreshold;

  // Updated template with unknown handling
  const improvedTemplate: Template = {
    id: 'coastal-claims-v2-structured',
    name: 'Coastal Claims V2 - Structured Questions (RECOMMENDED)',
    description: 'Clean question-based format with logical groupings and unknown handling',
    instructions: `You are Coastal Claims Services Residential Scope Pro™.

CRITICAL: Always create a downloadable Canvas document first, then fill out the template below.

INSTRUCTIONS: Copy this template exactly, replacing only the bracketed items with actual data from photos and adjuster notes.

UNKNOWN INFORMATION HANDLING:
- If you cannot determine the answer from photos/notes, write "ADJUSTER TO COMPLETE"
- If information is partially visible but unclear, write "ADJUSTER TO VERIFY"
- If a field is not applicable, write "N/A"
- Never guess or assume information not clearly visible

=== TEMPLATE START ===

Residential Scope Note

Insured: [FULL NAME or ADJUSTER TO COMPLETE]
Property Address: [COMPLETE ADDRESS or ADJUSTER TO COMPLETE]
Property Type: [Single-Family / Duplex / Townhome or ADJUSTER TO COMPLETE]
Stories: [1 / 2 / 3 or ADJUSTER TO COMPLETE]
Pitch: [Low / Moderate / Steep or ADJUSTER TO COMPLETE]
Access Issues: [Yes / No or ADJUSTER TO COMPLETE]

MITIGATION
Roof Tarped: [Yes / No; if yes, what was the cost or ADJUSTER TO COMPLETE]
Trees Downed: [Yes / No; if yes, cost to remove the tree or ADJUSTER TO COMPLETE]
Mitigation Cost Incurred: [$ amount or ADJUSTER TO COMPLETE]

EXTERIOR SCOPE
Is there damage to the home's exterior:
Front Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Right Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Rear Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Left Elevation: [Yes / No or ADJUSTER TO COMPLETE]

FENCE
Fence Present: [Yes / No or ADJUSTER TO COMPLETE]
Fence Type: [Wood / Vinyl / Chain Link / Other or ADJUSTER TO COMPLETE]
Fence Damage: [Yes / No or ADJUSTER TO COMPLETE]
Fence Sections Damaged: [Number or None or ADJUSTER TO COMPLETE]

SCREEN ROOM
Screen Room Present: [Yes / No or ADJUSTER TO COMPLETE]
Screen Damage: [Yes / No or ADJUSTER TO COMPLETE]
Number of Screen Panels Damaged: [# or ADJUSTER TO COMPLETE]
Roof or Frame Damage: [Yes / No or ADJUSTER TO COMPLETE]

SIDING
Siding Material: [Vinyl / Wood / Hardie / Stucco / Other or ADJUSTER TO COMPLETE]
Siding Damage Visible: [Yes / No or ADJUSTER TO COMPLETE]
Paint or Coating Issues: [Yes / No or ADJUSTER TO COMPLETE]
Counter Flashing Will Require Siding Repair: [Yes / No or ADJUSTER TO COMPLETE]

WINDOWS
Window Damage: [Yes / No or ADJUSTER TO COMPLETE]
Window Screens: [Missing / Torn / Intact or ADJUSTER TO COMPLETE]

DOORS
Exterior Door Damage: [Yes / No or ADJUSTER TO COMPLETE]
Garage Door Damaged: [Yes / No or ADJUSTER TO COMPLETE]

MECHANICAL ITEMS
AC Unit: [Yes / No or ADJUSTER TO COMPLETE]
Pool Equipment: [Yes / No or ADJUSTER TO COMPLETE]
Other: [Yes / No or ADJUSTER TO COMPLETE]

DETACHED STRUCTURES
Detached Structures: [Number or None or ADJUSTER TO COMPLETE]
Location and Damage of Detached Structures: [What elevation and extent of damage or ADJUSTER TO COMPLETE]

ROOF SCOPE
SHINGLE TYPE:
Asphalt Shingles: [3 Tab / Architectural / Dimensional / Luxury or ADJUSTER TO COMPLETE]
Metal: [Corrugated / Exposed Fastener / 5V Crimp / Standing Seam or ADJUSTER TO COMPLETE]
Clay Tiles: [S Tile / Flat Tiles / Cap Barrel or ADJUSTER TO COMPLETE]
Concrete Tile: [Cup / S Tile / Flat or ADJUSTER TO COMPLETE]
Slate: [Natural / Synthetic / Composite or ADJUSTER TO COMPLETE]
Wood Shake: [Yes / No or ADJUSTER TO COMPLETE]
Stone Coated Steel: [Yes / No or ADJUSTER TO COMPLETE]
Mod Bit: [Yes / No or ADJUSTER TO COMPLETE]
Other: [Describe or ADJUSTER TO COMPLETE]

ROOF COMPONENTS:
Flashing: [Step / L-Flashing / Counter Flashing or ADJUSTER TO COMPLETE]
Chimney Cap Present: [Yes / No or ADJUSTER TO COMPLETE]
Chimney Flashing: [Size: Small / Medium / Large; Number of Chimneys or ADJUSTER TO COMPLETE]
Vents: [Turtle / Ridge / Off-Ridge / Power / Turbine / Solar or ADJUSTER TO COMPLETE]
Skylights Present: [Yes / No or ADJUSTER TO COMPLETE]
Satellite Dish Present: [Yes / No; will need to be detached and reset or ADJUSTER TO COMPLETE]
Solar Panels Present: [Yes / No or ADJUSTER TO COMPLETE]
Solar Panel Count: [Number or ADJUSTER TO COMPLETE]
Solar Panel Damage: [Yes / No or ADJUSTER TO COMPLETE]
Sheathing Damage: [Yes / No or ADJUSTER TO COMPLETE]
Sheathing Replacement Needed: [Yes / No or ADJUSTER TO COMPLETE]

GUTTERS
Elevation That Has Gutters: [Front / Right / Rear / Left or ADJUSTER TO COMPLETE]
Downspouts: [Number or ADJUSTER TO COMPLETE]
Gutter Guards: [Yes / No or ADJUSTER TO COMPLETE]
Painted Gutters: [Yes / No or ADJUSTER TO COMPLETE]

INTERIOR SCOPE
Ceiling Condition: [Stains / Leaks / Sagging / Cracks / Not Accessed or ADJUSTER TO COMPLETE]
Wall Condition: [Water Damage / Cracks / Peeling Paint / Mold Signs / Not Accessed or ADJUSTER TO COMPLETE]
Floor Condition: [Warped / Buckled / Stained / Not Accessed or ADJUSTER TO COMPLETE]

📝 NOTES FROM SCOPE PRO
Observations: [Add any observations from photos or ADJUSTER TO COMPLETE]
Special Circumstances: [Add any special circumstances or ADJUSTER TO COMPLETE]
Follow-up Items: [Add any follow-up items needed or ADJUSTER TO COMPLETE]

=== TEMPLATE END ===

RULES:
1. Copy the template exactly as shown above
2. Replace ONLY the bracketed placeholders with actual information
3. If you cannot determine information from photos/notes, write "ADJUSTER TO COMPLETE"
4. If information needs verification, write "ADJUSTER TO VERIFY"
5. Keep all formatting, spacing, and section headers identical
6. Name the document with the property address
7. Always use Canvas document, never chat window
8. Each line should remain separate - do not combine multiple fields

If the adjuster hasn't provided enough information, respond: "Please provide photos and property details to complete the scope report. Fields marked 'ADJUSTER TO COMPLETE' require additional information."`
  };

  // Updated numbered template with unknown handling
  const numberedTemplateSolution: Template = {
    id: 'coastal-claims-numbered-template',
    name: 'Coastal Claims Numbered Template',
    description: 'Numbered questions for maximum GPT compliance with unknown handling',
    instructions: `You are Coastal Claims Services Residential Scope Pro™.

CRITICAL: Create a downloadable Canvas document first, then fill out the numbered template below.

UNKNOWN INFORMATION HANDLING:
- If you cannot determine the answer from photos/notes, write "ADJUSTER TO COMPLETE"
- If information is partially visible but unclear, write "ADJUSTER TO VERIFY"
- If a field is not applicable, write "N/A"
- Never guess or assume information not clearly visible

NUMBERED TEMPLATE (copy exactly):

Residential Scope Note
1. Insured: [FULL NAME or ADJUSTER TO COMPLETE]
2. Property Address: [COMPLETE ADDRESS or ADJUSTER TO COMPLETE]
3. Property Type: [Single-Family / Duplex / Townhome or ADJUSTER TO COMPLETE]
4. Stories: [1 / 2 / 3 or ADJUSTER TO COMPLETE]
5. Pitch: [Low / Moderate / Steep or ADJUSTER TO COMPLETE]
6. Access Issues: [Yes / No or ADJUSTER TO COMPLETE]

MITIGATION
7. Roof Tarped: [Yes / No; if yes, what was the cost or ADJUSTER TO COMPLETE]
8. Trees Downed: [Yes / No; if yes, cost to remove the tree or ADJUSTER TO COMPLETE]
9. Mitigation Cost Incurred: [$ amount or ADJUSTER TO COMPLETE]

EXTERIOR SCOPE
10. Front Elevation: [Yes / No or ADJUSTER TO COMPLETE]
11. Right Elevation: [Yes / No or ADJUSTER TO COMPLETE]
12. Rear Elevation: [Yes / No or ADJUSTER TO COMPLETE]
13. Left Elevation: [Yes / No or ADJUSTER TO COMPLETE]

FENCE
14. Fence Present: [Yes / No or ADJUSTER TO COMPLETE]
15. Fence Type: [Wood / Vinyl / Chain Link / Other or ADJUSTER TO COMPLETE]
16. Fence Damage: [Yes / No or ADJUSTER TO COMPLETE]
17. Fence Sections Damaged: [Number or None or ADJUSTER TO COMPLETE]

SCREEN ROOM
18. Screen Room Present: [Yes / No or ADJUSTER TO COMPLETE]
19. Screen Damage: [Yes / No or ADJUSTER TO COMPLETE]
20. Number of Screen Panels Damaged: [# or ADJUSTER TO COMPLETE]
21. Roof or Frame Damage: [Yes / No or ADJUSTER TO COMPLETE]

SIDING
22. Siding Material: [Vinyl / Wood / Hardie / Stucco / Other or ADJUSTER TO COMPLETE]
23. Siding Damage Visible: [Yes / No or ADJUSTER TO COMPLETE]
24. Paint or Coating Issues: [Yes / No or ADJUSTER TO COMPLETE]
25. Counter Flashing Will Require Siding Repair: [Yes / No or ADJUSTER TO COMPLETE]

WINDOWS
26. Window Damage: [Yes / No or ADJUSTER TO COMPLETE]
27. Window Screens: [Missing / Torn / Intact or ADJUSTER TO COMPLETE]

DOORS
28. Exterior Door Damage: [Yes / No or ADJUSTER TO COMPLETE]
29. Garage Door Damaged: [Yes / No or ADJUSTER TO COMPLETE]

MECHANICAL ITEMS
30. AC Unit: [Yes / No or ADJUSTER TO COMPLETE]
31. Pool Equipment: [Yes / No or ADJUSTER TO COMPLETE]
32. Other: [Yes / No or ADJUSTER TO COMPLETE]

DETACHED STRUCTURES
33. Detached Structures: [Number or None or ADJUSTER TO COMPLETE]
34. Location and Damage of Detached Structures: [What elevation and extent of damage or ADJUSTER TO COMPLETE]

ROOF SCOPE - SHINGLE TYPE
35. Asphalt Shingles: [3 Tab / Architectural / Dimensional / Luxury or ADJUSTER TO COMPLETE]
36. Metal: [Corrugated / Exposed Fastener / 5V Crimp / Standing Seam or ADJUSTER TO COMPLETE]
37. Clay Tiles: [S Tile / Flat Tiles / Cap Barrel or ADJUSTER TO COMPLETE]
38. Concrete Tile: [Cup / S Tile / Flat or ADJUSTER TO COMPLETE]
39. Slate: [Natural / Synthetic / Composite or ADJUSTER TO COMPLETE]
40. Wood Shake: [Yes / No or ADJUSTER TO COMPLETE]
41. Stone Coated Steel: [Yes / No or ADJUSTER TO COMPLETE]
42. Mod Bit: [Yes / No or ADJUSTER TO COMPLETE]
43. Other: [Describe or ADJUSTER TO COMPLETE]

ROOF COMPONENTS
44. Flashing: [Step / L-Flashing / Counter Flashing or ADJUSTER TO COMPLETE]
45. Chimney Cap Present: [Yes / No or ADJUSTER TO COMPLETE]
46. Chimney Flashing: [Size: Small / Medium / Large; Number of Chimneys or ADJUSTER TO COMPLETE]
47. Vents: [Turtle / Ridge / Off-Ridge / Power / Turbine / Solar or ADJUSTER TO COMPLETE]
48. Skylights Present: [Yes / No or ADJUSTER TO COMPLETE]
49. Satellite Dish Present: [Yes / No; will need to be detached and reset or ADJUSTER TO COMPLETE]
50. Solar Panels Present: [Yes / No or ADJUSTER TO COMPLETE]
51. Solar Panel Count: [Number or ADJUSTER TO COMPLETE]
52. Solar Panel Damage: [Yes / No or ADJUSTER TO COMPLETE]
53. Sheathing Damage: [Yes / No or ADJUSTER TO COMPLETE]
54. Sheathing Replacement Needed: [Yes / No or ADJUSTER TO COMPLETE]

GUTTERS
55. Elevation That Has Gutters: [Front / Right / Rear / Left or ADJUSTER TO COMPLETE]
56. Downspouts: [Number or ADJUSTER TO COMPLETE]
57. Gutter Guards: [Yes / No or ADJUSTER TO COMPLETE]
58. Painted Gutters: [Yes / No or ADJUSTER TO COMPLETE]

INTERIOR SCOPE
59. Ceiling Condition: [Stains / Leaks / Sagging / Cracks / Not Accessed or ADJUSTER TO COMPLETE]
60. Wall Condition: [Water Damage / Cracks / Peeling Paint / Mold Signs / Not Accessed or ADJUSTER TO COMPLETE]
61. Floor Condition: [Warped / Buckled / Stained / Not Accessed or ADJUSTER TO COMPLETE]

📝 NOTES FROM SCOPE PRO
62. Observations: [Add any observations from photos or ADJUSTER TO COMPLETE]
63. Special Circumstances: [Add any special circumstances or ADJUSTER TO COMPLETE]
64. Follow-up Items: [Add any follow-up items needed or ADJUSTER TO COMPLETE]

RULES:
- Copy template exactly with all numbers
- Replace ONLY bracketed placeholders
- If you cannot determine information, write "ADJUSTER TO COMPLETE"
- If information needs verification, write "ADJUSTER TO VERIFY"
- Keep identical formatting and line breaks
- Name document with property address
- Always use Canvas, never chat window

If missing info: "Please provide photos and property details. Fields marked 'ADJUSTER TO COMPLETE' require additional information."`
  };

  // Updated simple template with unknown handling
  const simpleTemplate: Template = {
    id: 'coastal-claims-simple',
    name: 'Coastal Claims Simple Template',
    description: 'Clean, minimal instructions with unknown handling',
    instructions: `You are Coastal Claims Services Residential Scope Pro™.

CRITICAL: Always create a downloadable Canvas document first.

UNKNOWN INFORMATION HANDLING:
- If you cannot determine the answer from photos/notes, write "ADJUSTER TO COMPLETE"
- If information is partially visible but unclear, write "ADJUSTER TO VERIFY"
- If a field is not applicable, write "N/A"
- Never guess or assume information not clearly visible

Fill out this exact template with information from photos and adjuster notes:

Residential Scope Note
Insured: [FULL NAME or ADJUSTER TO COMPLETE]
Property Address: [COMPLETE ADDRESS or ADJUSTER TO COMPLETE]
Property Type: [Single-Family / Duplex / Townhome or ADJUSTER TO COMPLETE]
Stories: [1 / 2 / 3 or ADJUSTER TO COMPLETE]
Pitch: [Low / Moderate / Steep or ADJUSTER TO COMPLETE]
Access Issues: [Yes / No or ADJUSTER TO COMPLETE]

MITIGATION
Roof Tarped: [Yes / No; if yes, what was the cost or ADJUSTER TO COMPLETE]
Trees Downed: [Yes / No; if yes, cost to remove the tree or ADJUSTER TO COMPLETE]
Mitigation Cost Incurred: [$ amount or ADJUSTER TO COMPLETE]

EXTERIOR SCOPE
Front Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Right Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Rear Elevation: [Yes / No or ADJUSTER TO COMPLETE]
Left Elevation: [Yes / No or ADJUSTER TO COMPLETE]

FENCE
Fence Present: [Yes / No or ADJUSTER TO COMPLETE]
Fence Type: [Wood / Vinyl / Chain Link / Other or ADJUSTER TO COMPLETE]
Fence Damage: [Yes / No or ADJUSTER TO COMPLETE]
Fence Sections Damaged: [Number or None or ADJUSTER TO COMPLETE]

SCREEN ROOM
Screen Room Present: [Yes / No or ADJUSTER TO COMPLETE]
Screen Damage: [Yes / No or ADJUSTER TO COMPLETE]
Number of Screen Panels Damaged: [# or ADJUSTER TO COMPLETE]
Roof or Frame Damage: [Yes / No or ADJUSTER TO COMPLETE]

SIDING
Siding Material: [Vinyl / Wood / Hardie / Stucco / Other or ADJUSTER TO COMPLETE]
Siding Damage Visible: [Yes / No or ADJUSTER TO COMPLETE]
Paint or Coating Issues: [Yes / No or ADJUSTER TO COMPLETE]
Counter Flashing Will Require Siding Repair: [Yes / No or ADJUSTER TO COMPLETE]

WINDOWS
Window Damage: [Yes / No or ADJUSTER TO COMPLETE]
Window Screens: [Missing / Torn / Intact or ADJUSTER TO COMPLETE]

DOORS
Exterior Door Damage: [Yes / No or ADJUSTER TO COMPLETE]
Garage Door Damaged: [Yes / No or ADJUSTER TO COMPLETE]

MECHANICAL ITEMS
AC Unit: [Yes / No or ADJUSTER TO COMPLETE]
Pool Equipment: [Yes / No or ADJUSTER TO COMPLETE]
Other: [Yes / No or ADJUSTER TO COMPLETE]

DETACHED STRUCTURES
Detached Structures: [Number or None or ADJUSTER TO COMPLETE]
Location and Damage: [What elevation and extent of damage or ADJUSTER TO COMPLETE]

ROOF SCOPE - SHINGLE TYPE
Asphalt Shingles: [3 Tab / Architectural / Dimensional / Luxury or ADJUSTER TO COMPLETE]
Metal: [Corrugated / Exposed Fastener / 5V Crimp / Standing Seam or ADJUSTER TO COMPLETE]
Clay Tiles: [S Tile / Flat Tiles / Cap Barrel or ADJUSTER TO COMPLETE]
Concrete Tile: [Cup / S Tile / Flat or ADJUSTER TO COMPLETE]
Slate: [Natural / Synthetic / Composite or ADJUSTER TO COMPLETE]
Wood Shake: [Yes / No or ADJUSTER TO COMPLETE]
Stone Coated Steel: [Yes / No or ADJUSTER TO COMPLETE]
Mod Bit: [Yes / No or ADJUSTER TO COMPLETE]
Other: [Describe or ADJUSTER TO COMPLETE]

ROOF COMPONENTS
Flashing: [Step / L-Flashing / Counter Flashing or ADJUSTER TO COMPLETE]
Chimney Cap Present: [Yes / No or ADJUSTER TO COMPLETE]
Chimney Flashing: [Size: Small / Medium / Large; Number of Chimneys or ADJUSTER TO COMPLETE]
Vents: [Turtle / Ridge / Off-Ridge / Power / Turbine / Solar or ADJUSTER TO COMPLETE]
Skylights Present: [Yes / No or ADJUSTER TO COMPLETE]
Satellite Dish Present: [Yes / No; will need to be detached and reset or ADJUSTER TO COMPLETE]
Solar Panels Present: [Yes / No or ADJUSTER TO COMPLETE]
Solar Panel Count: [Number or ADJUSTER TO COMPLETE]
Solar Panel Damage: [Yes / No or ADJUSTER TO COMPLETE]
Sheathing Damage: [Yes / No or ADJUSTER TO COMPLETE]
Sheathing Replacement Needed: [Yes / No or ADJUSTER TO COMPLETE]

GUTTERS
Elevation That Has Gutters: [Front / Right / Rear / Left or ADJUSTER TO COMPLETE]
Downspouts: [Number or ADJUSTER TO COMPLETE]
Gutter Guards: [Yes / No or ADJUSTER TO COMPLETE]
Painted Gutters: [Yes / No or ADJUSTER TO COMPLETE]

INTERIOR SCOPE
Ceiling Condition: [Stains / Leaks / Sagging / Cracks / Not Accessed or ADJUSTER TO COMPLETE]
Wall Condition: [Water Damage / Cracks / Peeling Paint / Mold Signs / Not Accessed or ADJUSTER TO COMPLETE]
Floor Condition: [Warped / Buckled / Stained / Not Accessed or ADJUSTER TO COMPLETE]

📝 NOTES FROM SCOPE PRO
Observations: [Add any observations from photos or ADJUSTER TO COMPLETE]
Special Circumstances: [Add any special circumstances or ADJUSTER TO COMPLETE]
Follow-up Items: [Add any follow-up items needed or ADJUSTER TO COMPLETE]

RULES:
1. Copy template exactly
2. Replace only [bracketed] items
3. If you cannot determine information, write "ADJUSTER TO COMPLETE"
4. If information needs verification, write "ADJUSTER TO VERIFY"
5. Keep all formatting
6. Use Canvas document
7. Name file with property address

If missing info: "Please provide photos and property details. Fields marked 'ADJUSTER TO COMPLETE' require additional information."`
  };

  // Initialize templates on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('gpt-templates');
    if (savedTemplates) {
      const parsed = JSON.parse(savedTemplates);
      setTemplates(parsed);
    } else {
      setTemplates([improvedTemplate, numberedTemplateSolution, simpleTemplate]);
    }
    
    // Load the improved template by default
    setInstructions(improvedTemplate.instructions);
    setActiveTemplate(improvedTemplate.id);
  }, []);

  // Save templates to localStorage
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('gpt-templates', JSON.stringify(templates));
    }
  }, [templates]);

  const saveTemplate = () => {
    if (!activeTemplate) return;
    
    const updatedTemplates = templates.map(template => 
      template.id === activeTemplate 
        ? { ...template, instructions }
        : template
    );
    setTemplates(updatedTemplates);
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setInstructions(template.instructions);
      setActiveTemplate(templateId);
    }
  };

  const exportInstructions = () => {
    const blob = new Blob([instructions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTemplate || 'gpt-instructions'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(instructions);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const optimizeInstructions = () => {
    // Remove extra whitespace while preserving structure
    const optimized = instructions
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
      .replace(/[ \t]+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n /g, '\n') // Remove spaces at beginning of lines
      .trim();
    
    setInstructions(optimized);
  };

  const getCharacterCountColor = () => {
    if (isOverLimit) return 'text-red-600';
    if (isNearLimit) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getCharacterCountBg = () => {
    if (isOverLimit) return 'bg-red-50 border-red-200';
    if (isNearLimit) return 'bg-orange-50 border-orange-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-700" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">GPT Instructions Manager</h1>
                <p className="text-sm text-gray-600">Coastal Claims Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={optimizeInstructions}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Optimize</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={exportInstructions}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates</h2>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      activeTemplate === template.id
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    } border`}
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    {template.id === 'coastal-claims-v2-structured' && (
                      <div className="mt-2 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded font-medium">
                        RECOMMENDED
                      </div>
                    )}
                    {template.id === 'coastal-claims-numbered-template' && (
                      <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                        NUMBERED
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              <button
                onClick={saveTemplate}
                disabled={!activeTemplate}
                className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Template</span>
              </button>
            </div>

            {/* Character Count Card */}
            <div className={`mt-6 rounded-lg border-2 p-4 ${getCharacterCountBg()}`}>
              <div className="flex items-center space-x-2">
                {isOverLimit ? (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                ) : isNearLimit ? (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <div className={`text-2xl font-bold ${getCharacterCountColor()}`}>
                    {characterCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    of {characterLimit.toLocaleString()} characters
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((characterCount / characterLimit) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {isOverLimit && (
                <div className="mt-2 text-xs text-red-600">
                  Exceeds OpenAI limit by {(characterCount - characterLimit).toLocaleString()} characters
                </div>
              )}
              {isNearLimit && !isOverLimit && (
                <div className="mt-2 text-xs text-orange-600">
                  Approaching character limit
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-6 py-3 text-sm font-medium ${
                      !showPreview
                        ? 'border-b-2 border-blue-700 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Edit Instructions
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`px-6 py-3 text-sm font-medium ${
                      showPreview
                        ? 'border-b-2 border-blue-700 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {!showPreview ? (
                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                      GPT Instructions
                    </label>
                    <textarea
                      id="instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className={`w-full h-96 p-4 border rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isOverLimit ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your GPT instructions here..."
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Use this editor to craft and refine your custom GPT instructions. The system will automatically validate formatting and character limits.
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50 h-96 overflow-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {instructions || 'No instructions to preview'}
                      </pre>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      This preview shows how your instructions will appear when copied to OpenAI's custom GPT interface.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Unknown Information Handling Guide */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-amber-900 mb-2">🔍 Unknown Information Handling</h3>
              <div className="text-sm text-amber-800 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-100 p-3 rounded border">
                    <h4 className="font-medium text-amber-900">ADJUSTER TO COMPLETE</h4>
                    <p className="text-xs mt-1">Use when information cannot be determined from photos/notes</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded border">
                    <h4 className="font-medium text-amber-900">ADJUSTER TO VERIFY</h4>
                    <p className="text-xs mt-1">Use when information is partially visible but unclear</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded border">
                    <h4 className="font-medium text-amber-900">N/A</h4>
                    <p className="text-xs mt-1">Use when a field is not applicable to the property</p>
                  </div>
                </div>
                <p className="text-xs mt-3 font-medium">
                  ✅ This ensures adjusters know exactly what information they need to provide and prevents GPT from guessing or making assumptions.
                </p>
              </div>
            </div>

            {/* Template Comparison */}
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">🎯 Template Comparison</h3>
              <div className="text-sm text-emerald-800 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-100 p-3 rounded border">
                    <h4 className="font-medium text-emerald-900">V2 Structured (Recommended)</h4>
                    <ul className="text-xs mt-2 space-y-1">
                      <li>• Clean logical groupings</li>
                      <li>• Easy to read sections</li>
                      <li>• Natural flow for adjusters</li>
                      <li>• Clear unknown handling</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 p-3 rounded border">
                    <h4 className="font-medium text-green-900">Numbered Template</h4>
                    <ul className="text-xs mt-2 space-y-1">
                      <li>• Maximum GPT compliance</li>
                      <li>• Sequential processing</li>
                      <li>• Easy validation (64 items)</li>
                      <li>• Prevents field grouping</li>
                    </ul>
                  </div>
                  <div className="bg-blue-100 p-3 rounded border">
                    <h4 className="font-medium text-blue-900">Simple Template</h4>
                    <ul className="text-xs mt-2 space-y-1">
                      <li>• Minimal instructions</li>
                      <li>• Fastest to implement</li>
                      <li>• Clean structure</li>
                      <li>• Good for testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Structure Guide */}
            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-indigo-900 mb-2 flex items-center">
                  📐 Advanced Prompt Structure Guide
                  <span className="ml-2 text-xs text-indigo-600 group-open:hidden">(Click to expand)</span>
                </summary>
                <div className="text-sm text-indigo-800 space-y-4 mt-4">
                  
                  {/* Core Concepts */}
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">🧠 Core Concepts That Actually Matter</h4>
                    <div className="space-y-3">
                      <div className="bg-indigo-100 p-3 rounded border">
                        <h5 className="font-medium text-indigo-900">Semantic Space Navigation</h5>
                        <p className="text-xs mt-1">Roles don't make AI smarter—they activate specific associations. "You are my prompt coach" creates relationship and ongoing interaction patterns, not just expertise.</p>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded border">
                        <h5 className="font-medium text-indigo-900">Cognitive Load Theory</h5>
                        <p className="text-xs mt-1">Humans can hold 3-4 complex concepts at once. Hard Mode: Show everything (power users). Easy Mode: One question at a time (beginners).</p>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded border">
                        <h5 className="font-medium text-indigo-900">Progressive Disclosure</h5>
                        <p className="text-xs mt-1">Blueprint Disclosure: Show full structure first. Fog of War: Reveal only what's immediately relevant. Choose based on user expertise.</p>
                      </div>
                    </div>
                  </div>

                  {/* Hard vs Easy Mode */}
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">⚡ Hard Mode vs Easy Mode</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-red-50 border border-red-200 p-3 rounded">
                        <h5 className="font-medium text-red-900">Hard Mode (Power Users)</h5>
                        <ul className="text-xs mt-2 space-y-1 text-red-800">
                          <li>• Show all questions at once</li>
                          <li>• Front-load complexity</li>
                          <li>• Complete control</li>
                          <li>• "Craft a blueprint"</li>
                          <li>• Assumes expertise</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 border border-green-200 p-3 rounded">
                        <h5 className="font-medium text-green-900">Easy Mode (Beginners)</h5>
                        <ul className="text-xs mt-2 space-y-1 text-green-800">
                          <li>• Single-question flow</li>
                          <li>• Progressive disclosure</li>
                          <li>• Approachable start</li>
                          <li>• "Run a program"</li>
                          <li>• Prevents overwhelm</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Practical Checklist */}
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">✅ Core Components Checklist</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold text-xs mt-0.5">✓</span>
                        <div>
                          <strong className="text-xs">Role Definition:</strong>
                          <span className="text-xs ml-1">"You are my patient tutor" (relationship) vs "You are an expert" (authority)</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold text-xs mt-0.5">✓</span>
                        <div>
                          <strong className="text-xs">Sequential Goals:</strong>
                          <span className="text-xs ml-1">"(a) diagnose level (b) deliver lessons (c) ensure mastery"</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold text-xs mt-0.5">✓</span>
                        <div>
                          <strong className="text-xs">Explicit Constraints:</strong>
                          <span className="text-xs ml-1">"≤ 250 words per response" vs "Keep responses short"</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold text-xs mt-0.5">✓</span>
                        <div>
                          <strong className="text-xs">Progress Mechanics:</strong>
                          <span className="text-xs ml-1">"Escalate only when user scores ≥ 80% on prior task"</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold text-xs mt-0.5">✓</span>
                        <div>
                          <strong className="text-xs">Output Format:</strong>
                          <span className="text-xs ml-1">Show exact template structure with consistent markdown</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">❌ Common Mistakes to Avoid</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold text-xs mt-0.5">✗</span>
                        <div>
                          <strong className="text-xs text-red-800">Role Accuracy Trap:</strong>
                          <span className="text-xs ml-1">"World's best teacher" adds nothing. Use behavioral specificity instead.</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold text-xs mt-0.5">✗</span>
                        <div>
                          <strong className="text-xs text-red-800">Vague Memory Instructions:</strong>
                          <span className="text-xs ml-1">"Remember our conversation" vs "Carry confirmed answers forward"</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold text-xs mt-0.5">✗</span>
                        <div>
                          <strong className="text-xs text-red-800">Overwhelm Threshold:</strong>
                          <span className="text-xs ml-1">5+ questions, 500+ words, or 3+ new concepts without practice</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Triggers */}
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">🎯 Powerful Semantic Triggers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs"><strong>"12-week curriculum"</strong> - Activates complete course associations</p>
                        <p className="text-xs"><strong>"minimum viable"</strong> - Signals enough to start, can expand later</p>
                        <p className="text-xs"><strong>"methodically diagnose"</strong> - Implies systematic assessment</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs"><strong>"progressively harder"</strong> - Behavioral anchor for escalation</p>
                        <p className="text-xs"><strong>"our shared mission"</strong> - Creates collaborative frame</p>
                        <p className="text-xs"><strong>"canvas document"</strong> - Triggers downloadable format</p>
                      </div>
                    </div>
                  </div>

                  {/* Application to Claims */}
                  <div className="border-t border-indigo-300 pt-3">
                    <h4 className="font-semibold text-indigo-900 mb-2">🏠 Application to Coastal Claims</h4>
                    <p className="text-xs text-indigo-700 mb-2">Our current templates use <strong>Hard Mode</strong> approach - showing complete template upfront. This works for experienced adjusters but could overwhelm newcomers.</p>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="text-xs font-medium text-indigo-900">Consider Easy Mode version:</p>
                      <p className="text-xs text-indigo-800 mt-1">"Let me ask you one question at a time about this property, then build your scope report as we go."</p>
                    </div>
                  </div>

                </div>
              </details>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Quick Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Start with V2 Structured</strong> - Best balance of readability and control</li>
                <li>• <strong>Use "ADJUSTER TO COMPLETE"</strong> - Prevents GPT from guessing unknown information</li>
                <li>• <strong>Test with sample data</strong> - Verify the output maintains proper line breaks</li>
                <li>• <strong>Check Canvas output</strong> - Ensure it creates downloadable documents</li>
                <li>• <strong>Review completed fields</strong> - Look for any "ADJUSTER TO COMPLETE" markers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;