'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, User, Settings, Download, Palette } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
import { User as UserType } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

function AccountSettings({ state }: { state: ActionState }) {
  const { data: user } = useSWR<UserType>('/api/user', fetcher);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5 text-blue-600" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={user?.name ?? ''}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email ?? ''}
              required
            />
          </div>
          <div>
            <Label htmlFor="profession" className="mb-2">
              Profession
            </Label>
            <Select defaultValue="contractor">
              <SelectTrigger>
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="designer">Interior Designer</SelectItem>
                <SelectItem value="homeowner">Homeowner</SelectItem>
                <SelectItem value="realtor">Real Estate Agent</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}
          {state.success && (
            <p className="text-green-500 text-sm">{state.success}</p>
          )}
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function FloorPlanPreferences() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-blue-600" />
          Floor Plan Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="units" className="mb-2">
            Default Units
          </Label>
          <Select defaultValue="feet">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feet">Feet and Inches</SelectItem>
              <SelectItem value="meters">Meters</SelectItem>
              <SelectItem value="centimeters">Centimeters</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="style" className="mb-2">
            Default Style
          </Label>
          <Select defaultValue="modern">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="contemporary">Contemporary</SelectItem>
              <SelectItem value="craftsman">Craftsman</SelectItem>
              <SelectItem value="colonial">Colonial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Include Furniture</Label>
            <p className="text-sm text-gray-500">
              Automatically add furniture suggestions to floor plans
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Building Code Compliance</Label>
            <p className="text-sm text-gray-500">
              Check plans against local building codes
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-save Projects</Label>
            <p className="text-sm text-gray-500">
              Automatically save your work every 5 minutes
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}

function ExportSettings() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="mr-2 h-5 w-5 text-blue-600" />
          Export Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="format" className="mb-2">
            Default Export Format
          </Label>
          <Select defaultValue="pdf">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="dwg">AutoCAD (DWG)</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="png">PNG Image</SelectItem>
              <SelectItem value="jpg">JPG Image</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quality" className="mb-2">
            Export Quality
          </Label>
          <Select defaultValue="high">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft (Fast)</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="high">High Quality</SelectItem>
              <SelectItem value="print">Print Ready</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Include Dimensions</Label>
            <p className="text-sm text-gray-500">
              Show room and wall dimensions on exports
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Include Watermark</Label>
            <p className="text-sm text-gray-500">
              Add "Created with FloorPlanAI" watermark
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}

function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5 text-blue-600" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="theme" className="mb-2">
            Color Theme
          </Label>
          <Select defaultValue="light">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="auto">Auto (System)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="zoom" className="mb-2">
            Default Zoom Level
          </Label>
          <Select defaultValue="fit">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25%</SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
              <SelectItem value="fit">Fit to Screen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Grid</Label>
            <p className="text-sm text-gray-500">
              Display grid lines in the editor
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Snap to Grid</Label>
            <p className="text-sm text-gray-500">
              Automatically align objects to grid
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}

export default function GeneralPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    {}
  );

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Customize your FloorPlanAI experience and preferences.
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <AccountSettings state={state} />
        </Suspense>
        
        <FloorPlanPreferences />
        <ExportSettings />
        <AppearanceSettings />
      </div>
    </section>
  );
}