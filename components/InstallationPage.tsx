'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from './Header';
import Footer from './ui/Footer';
const InstallationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center mb-8">
            Easy Fly Screen Installation
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Transform your home with our simple DIY installation guide. Enjoy fresh air without uninvited guests!
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="justify-center">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="steps">Installation Steps</TabsTrigger>
            <TabsTrigger value="video">Video Tutorial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Installation Overview</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Installing a fly screen is a simple DIY project that can be completed in just a few hours. 
                  With our step-by-step guide, you&apos;ll be enjoying insect-free fresh air in no time!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardHeader>
              <h2 className="text-2xl font-bold">What You&apos;ll Need</h2>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Fly screen (material of your choice)</li>
                  <li>Measuring tape</li>
                  <li>Scissors or cutter</li>
                  <li>Double-sided tape or screws</li>
                  <li>Folding rule or ruler</li>
                  <li>Pencil for marking</li>
                  <li>Drill (optional)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="steps">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Step 1: Take Measurements</h3>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Measure the height and width of the door or window</li>
                    <li>Add about 2 cm on all sides for a proper fit</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Step 2: Cut the Fly Screen</h3>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Roll out the fly screen and mark the dimensions</li>
                    <li>Cut along the marked lines</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Step 3: Prepare the Frame</h3>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Clean the area around the window or door</li>
                    <li>If using screws, mark the drill locations</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Step 4: Install the Fly Screen</h3>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Apply double-sided tape or drill holes for screws</li>
                    <li>Attach the fly screen, starting from one corner</li>
                    <li>Secure the screen in place</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Step 5: Final Touches</h3>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Check for gaps or wrinkles</li>
                    <li>Trim excess material</li>
                    <li>Ensure edges are firmly secured</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-bold">Video Tutorial</h2>
    </CardHeader>
    <CardContent>
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src="/api/placeholder/640/360"
          alt="Video placeholder"
          layout="fill"
          className="rounded-lg object-cover"
        />
      </div>
      <p className="text-gray-600 mt-4">
        Watch our step-by-step video tutorial for a visual guide to installing your fly screen.
      </p>
    </CardContent>
  </Card>
</TabsContent>
        </Tabs>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our team is always here to assist you with any questions or concerns.
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstallationPage;