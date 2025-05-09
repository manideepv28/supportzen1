"use client";

import { PageHeader } from "@/components/page-header";
import { KnowledgeBaseSearch } from "@/components/knowledge-base-search";
import { FaqAccordion } from "@/components/faq-accordion";
import { ArticleCard } from "@/components/article-card";
import { mockFaqItems, mockArticles, FaqItem, Article as ArticleType } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(ITEMS_PER_PAGE);

  const handleSearch = (query: string) => {
    setSearchTerm(query.toLowerCase());
    setVisibleArticles(ITEMS_PER_PAGE); // Reset pagination on new search
  };

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return mockFaqItems;
    return mockFaqItems.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.category.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return mockArticles;
    return mockArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm]);

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Knowledge Base & FAQs"
        description="Find answers to your questions and learn more about our products and services."
      />
      <KnowledgeBaseSearch onSearch={handleSearch} />

      <Tabs defaultValue="articles" className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          {filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.slice(0, visibleArticles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              {visibleArticles < filteredArticles.length && (
                <div className="mt-8 text-center">
                  <Button onClick={loadMoreArticles} variant="outline" className="text-accent border-accent hover:bg-accent/10">
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">No Articles Found</h3>
              <p className="text-muted-foreground mt-2">
                We couldn't find any articles matching your search criteria "{searchTerm}".
              </p>
              <Button asChild variant="link" className="mt-4 text-accent">
                <Link href="/submit-inquiry">Contact Support</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="faqs">
          {filteredFaqs.length > 0 ? (
            <FaqAccordion faqs={filteredFaqs} />
          ) : (
             <div className="text-center py-12">
              <h3 className="text-xl font-semibold">No FAQs Found</h3>
              <p className="text-muted-foreground mt-2">
                We couldn't find any FAQs matching your search criteria "{searchTerm}".
              </p>
               <Button asChild variant="link" className="mt-4 text-accent">
                <Link href="/submit-inquiry">Ask Our Support Team</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Dummy page for individual articles (not fully implemented for brevity)
export function ArticlePage({ params }: { params: { id: string } }) {
  const article = mockArticles.find(a => a.id === params.id);
  if (!article) return <div>Article not found</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
