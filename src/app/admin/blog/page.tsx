"use client";

import { useState } from "react";
import { BLOG_POSTS } from "@/data/dummy";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";

type Post = typeof BLOG_POSTS[0];

type PostForm = {
  title: string;
  author: string;
  status: "published" | "draft";
  tags: string;
  excerpt: string;
  content: string;
};

const Page = () => {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, control } = useForm<PostForm>();

  const openNew = () => {
    setEditingPost(null);
    reset({ title: "", author: "", status: "draft", tags: "", excerpt: "", content: "" });
    setIsFormOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    reset({
      title: post.title,
      author: post.author,
      status: post.status as "published" | "draft",
      tags: post.tags.join(", "),
      excerpt: post.excerpt,
      content: post.content,
    });
    setIsFormOpen(true);
  };

  const onSubmit = (data: PostForm) => {
    const tags = data.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...data, tags } : p));
      toast({ title: "Post Updated", description: `"${data.title}" has been updated.` });
    } else {
      const newPost: Post = {
        ...data,
        tags,
        id: `bp_${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
      };
      setPosts(prev => [newPost, ...prev]);
      toast({ title: "Post Created", description: `"${data.title}" has been created.` });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      const post = posts.find(p => p.id === deletingId);
      setPosts(prev => prev.filter(p => p.id !== deletingId));
      toast({ title: "Post Deleted", description: `"${post?.title}" has been removed.` });
    }
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Blog</h2>
          <p className="text-[#11111199] font-medium">Create, edit, and manage blog posts.</p>
        </div>
        <Button className="border border-[#FF079A] text-[#FF079A]" onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">Title</TableHead>
                <TableHead className="font-semibold text-gray-600">Author</TableHead>
                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600">Tags</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id} className="hover:bg-pink-50/30 transition-colors">
                  <TableCell>
                    <p className="font-bold text-gray-900">{post.title}</p>
                    <p className="text-xs text-[#11111199] mt-0.5 max-w-xs truncate">{post.excerpt}</p>
                  </TableCell>
                  <TableCell className="text-gray-700 font-medium">{post.author}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{format(new Date(post.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={post.status === "published" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs text-[#11111199]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(post)}>
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setDeletingId(post.id); setIsDeleteOpen(true); }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">No blog posts yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Post" : "New Blog Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register("title", { required: true })} placeholder="Post title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input {...register("author", { required: true })} placeholder="Author name" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input {...register("tags")} placeholder="Education, Health, Community" />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea {...register("excerpt")} placeholder="Short summary shown in listings..." rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea {...register("content")} placeholder="Full post content..." rows={6} />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit">{editingPost ? "Save Changes" : "Publish Post"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the post. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Page;