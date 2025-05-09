import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Paperclip, CornerDownRight } from "lucide-react";

interface EmailPreviewCardProps {
  subject: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  date: string;
  previewText: string;
  avatarSeed?: string;
}

export function EmailPreviewCard({
  subject,
  senderName,
  senderEmail,
  recipientName,
  recipientEmail,
  date,
  previewText,
  avatarSeed = "emailuser"
}: EmailPreviewCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="border-b p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://picsum.photos/seed/${avatarSeed}/40/40`} alt={senderName} data-ai-hint="user avatar"/>
            <AvatarFallback>{senderName.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">{senderName}</h3>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <p className="text-xs text-muted-foreground">from: {senderEmail}</p>
            <p className="text-xs text-muted-foreground">to: {recipientName} &lt;{recipientEmail}&gt;</p>
          </div>
        </div>
        <CardTitle className="text-lg mt-2 pt-2 border-t">{subject}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
          Hi {recipientName},
          <br /><br />
          {previewText}
          <br /><br />
          Thanks,
          <br />
          The SupportZen Team
        </p>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between items-center">
        <div className="flex space-x-2">
            <Button variant="outline" size="sm">
            <CornerDownRight className="mr-2 h-4 w-4" /> Reply
            </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Paperclip className="h-4 w-4" />
          <span>0 Attachments</span>
        </div>
      </CardFooter>
    </Card>
  );
}
