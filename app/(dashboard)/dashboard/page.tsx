'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Home, Download, Edit3, ArrowRight, PlusCircle } from 'lucide-react';

const mockFloorPlans = [
  {
    id: 1,
    name: "Modern 3BR Ranch",
    description: "3 bedroom ranch with open kitchen",
    created: "2 hours ago",
    thumbnail: "🏠"
  },
  {
    id: 2,
    name: "Cozy 2BR Apartment",
    description: "Small apartment layout with balcony",
    created: "1 day ago",
    thumbnail: "🏢"
  },
  {
    id: 3,
    name: "Family 4BR Colonial",
    description: "Traditional family home with office",
    created: "3 days ago",
    thumbnail: "🏘️"
  }
];

function ProjectOverview() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="mr-2 h-5 w-5 text-blue-600" />
          Project Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
            <p className="text-gray-600 mb-4">
              Create your first floor plan with AI-powered natural language processing.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Browse Templates</h3>
            <p className="text-gray-600 mb-4">
              Start with professionally designed templates for common layouts.
            </p>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              View Templates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Plans Created</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Edit3 className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Edits Made</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecentFloorPlans() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Floor Plans</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockFloorPlans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{plan.thumbnail}</div>
                <div>
                  <h3 className="font-medium">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                  <p className="text-xs text-gray-400">{plan.created}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start New Floor Plan
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Edit3 className="mr-2 h-4 w-4" />
            Continue Last Project
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            Browse Templates
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ArrowRight className="mr-2 h-4 w-4" />
            View Tutorial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FloorPlanDashboard() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Welcome to FloorPlanAI
          </h1>
          <p className="text-gray-600">
            Create professional floor plans with AI. Just describe your space and watch it come to life.
          </p>
        </div>

        <ProjectOverview />
        <QuickStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentFloorPlans />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </section>
  );
}