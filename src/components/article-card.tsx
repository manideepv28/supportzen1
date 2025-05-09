import type { Article } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ArrowRight, CalendarDays, User, Eye } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {article.imageUrl && (
        <div className="relative h-48 w-full">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={`${article.category} ${article.tags[0] || 'abstract'}`}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl leading-tight">
          <Link href={`/knowledge-base/articles/${article.id}`} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground flex items-center gap-2 pt-1">
           <span className="flex items-center gap-1"><User size={12}/> {article.author}</span> | <span className="flex items-center gap-1"><CalendarDays size={12}/> {format(parseISO(article.lastUpdated), "MMM d, yyyy")}</span> {article.views && <> | <span className="flex items-center gap-1"><Eye size={12}/> {article.views} views</span></>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="flex-wrap gap-2 pt-2 pb-4 px-6 border-t mt-auto">
        <div className="w-full flex justify-between items-center">
            <div>
                {article.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="mr-1 text-xs">{tag}</Badge>
                ))}
            </div>
            <Link href={`/knowledge-base/articles/${article.id}`} className="text-sm text-accent font-medium hover:underline flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
