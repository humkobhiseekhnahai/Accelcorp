import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle, User } from 'lucide-react';

interface Topic {
  id: number;
  title: string;
  author: string;
  replies: number;
}

export default function DiscussionFormComponent() {
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, title: "What's your favorite programming language and why?", author: "TechEnthusiast", replies: 15 },
    { id: 2, title: "Share your best React performance optimization tips", author: "ReactNinja", replies: 8 },
    { id: 3, title: "Discussing the future of AI in web development: opportunities and challenges", author: "AIExplorer", replies: 21 },
    { id: 4, title: "Serverless architecture: pros and cons from your experience", author: "CloudGuru", replies: 12 },
  ]);

  const [newTopic, setNewTopic] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic) {
      setTopics([...topics, { 
        id: topics.length + 1, 
        title: newTopic, 
        author: "You", 
        replies: 0
      }]);
      setNewTopic('');
    }
  };

  return (
    <div className='w-full h-full flex justify-center'>
    <div className="w-5/6 p-4 space-y-6 min-h-screen h-full">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Community Discussion Forum</h1>
      
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Start a new discussion..."
              className="flex-grow border-green-300 focus:border-green-500 focus:ring-green-500"
              aria-label="New topic title"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6">Post</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:bg-green-100 transition-colors border-green-200 flex flex-col justify-between">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-medium text-green-800 mb-2">{topic.title}</CardTitle>
              <div className="flex items-center text-sm text-green-600">
                <User className="h-4 w-4 mr-1" />
                <span>{topic.author}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex justify-between items-center text-sm text-green-600">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{topic.replies} replies</span>
              </div>
              <Button 
                variant="outline" 
                className="text-green-600 border-green-300 hover:bg-green-100 focus:bg-green-100 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                View Discussion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
