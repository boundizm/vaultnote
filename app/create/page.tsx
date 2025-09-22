'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  ArrowRight,
  Menu,
  X,
  FileText,
  Clock,
  ShieldCheck,
  ArrowUp,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Code,
  Smile,
  Eraser,
  Link as LinkIcon,
  MapPin,
  Globe
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import UnderlineExtension from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Link as LinkExtension } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { CodeBlock } from '@tiptap/extension-code-block';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateKey, encrypt, encryptWithPassword, keyToString } from '@/lib/crypto';

const MenuBar = ({
  editor,
  linkDialogOpen,
  setLinkDialogOpen,
  emojiDialogOpen,
  setEmojiDialogOpen,
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,
  linkTitle,
  setLinkTitle,
  linkTarget,
  setLinkTarget,
  handleInsertLink,
  handleInsertEmoji
}: {
  editor: any;
  linkDialogOpen: boolean;
  setLinkDialogOpen: (open: boolean) => void;
  emojiDialogOpen: boolean;
  setEmojiDialogOpen: (open: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  linkTitle: string;
  setLinkTitle: (title: string) => void;
  linkTarget: string;
  setLinkTarget: (target: string) => void;
  handleInsertLink: () => void;
  handleInsertEmoji: (emoji: string) => void;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg bg-card/50 p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('bold') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('italic') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('underline') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Underline (Ctrl+U)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" x2="20" y1="20" y2="20"></line></svg>
            <span className="sr-only">Underline</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('strike') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
            <span className="sr-only">Strikethrough</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Text Styling */}
        <div className="flex items-center gap-1">
          <Select
            value={editor.getAttributes('textStyle').fontSize || '16px'}
            onValueChange={(value: string) => editor.chain().focus().setFontSize(value).run()}
          >
            <SelectTrigger className="w-[110px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12px">Small</SelectItem>
              <SelectItem value="16px">Normal</SelectItem>
              <SelectItem value="20px">Large</SelectItem>
              <SelectItem value="24px">Extra Large</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={editor.getAttributes('textStyle').color || 'default'}
            onValueChange={(value: string) => {
              if (value === 'default') {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor(value).run();
              }
            }}
          >
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="#ef4444">Red</SelectItem>
              <SelectItem value="#10b981">Green</SelectItem>
              <SelectItem value="#3b82f6">Blue</SelectItem>
              <SelectItem value="#eab308">Yellow</SelectItem>
              <SelectItem value="#8b5cf6">Purple</SelectItem>
              <SelectItem value="#ec4899">Pink</SelectItem>
              <SelectItem value="#f97316">Orange</SelectItem>
              <SelectItem value="#14b8a6">Teal</SelectItem>
              <SelectItem value="#6366f1">Indigo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
            <span className="sr-only">Align Left</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Center"
          >
            <AlignCenter className="h-4 w-4" />
            <span className="sr-only">Center</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
            <span className="sr-only">Align Right</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('bulletList') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Bullet List</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('orderedList') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Numbered List</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Advanced Features */}
        <div className="flex items-center gap-0.5">
          <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
            <DialogTrigger asChild>
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
                  editor.isActive('link') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
                type="button"
                title="Add Link"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Add Link</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-text">Display Text</Label>
                  <Input
                    id="link-text"
                    placeholder="Link text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-title">Title (Tooltip)</Label>
                  <Input
                    id="link-title"
                    placeholder="Link title"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-target">Open In</Label>
                  <Select value={linkTarget} onValueChange={setLinkTarget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_blank">New window</SelectItem>
                      <SelectItem value="_self">Current window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInsertLink} disabled={!linkUrl.trim()}>
                    Add Link
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('codeBlock') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Code Block"
          >
            <Code className="h-4 w-4" />
            <span className="sr-only">Code Block</span>
          </button>

          <Dialog open={emojiDialogOpen} onOpenChange={setEmojiDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground"
                type="button"
                title="Add Emoji"
              >
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add emoji</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Emoji</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
                  {[
                    '😀', '😂', '🥰', '😊', '🤔', '😉', '😎', '🤗',
                    '👍', '👎', '👌', '✌️', '🤞', '👏', '🙌', '🤝',
                    '❤️', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎',
                    '🔥', '⭐', '✨', '💫', '🎉', '🎊', '🎈', '🎁',
                    '📝', '📚', '📖', '✏️', '📌', '📍', '🎯', '💡',
                    '⚡', '🔋', '💻', '📱', '⌚', '💾', '💿', '🎵',
                    '🎶', '🎵', '🎼', '🎹', '🎸', '🎺', '🎷', '🥁',
                    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸',
                    '⏰', '⏱️', '⌛', '⏳', '🌞', '🌝', '🌙', '⭐',
                    '❓', '❔', '❗', '❕', '💭', '💬', '🗯️', '💯'
                  ].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleInsertEmoji(emoji)}
                      className="flex items-center justify-center w-10 h-10 text-xl hover:bg-muted rounded-md transition-colors"
                      type="button"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground"
            type="button"
            title="Clear all formatting"
          >
            <Eraser className="h-4 w-4" />
            <span className="sr-only">Clear Formatting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Create() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [expiry, setExpiry] = useState('permanent');
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [maxViews, setMaxViews] = useState<number | null>(null);

  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; file: File; url: string }>>([]);

  // Dialog states
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkTarget, setLinkTarget] = useState('_blank');

  // Scroll-to-top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color,
      UnderlineExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      Image,
      CodeBlock,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap ProseMirror prose dark:prose-invert max-w-none outline-none min-h-[500px] px-4 py-3',
      },
    },
    immediatelyRender: false,
  });

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const handleCreate = async () => {
    const content = editor?.getHTML();
    if (!content || !content.trim()) return;

    // Validate password if protection is enabled
    if (isProtected && (!password || password.length < 6)) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsCreating(true);
    try {
      let encryptedData;
      let keyString = '';

      if (isProtected) {
        // Use password encryption
        encryptedData = await encryptWithPassword(content, password);
      } else {
        // Use regular encryption with stored key
        const key = await generateKey();
        const { ciphertext, iv } = await encrypt(content, key);
        encryptedData = { ciphertext, iv, salt: null, encryptedKey: null, keyIv: null };
        keyString = await keyToString(key);
      }

      const ciphertextB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData.ciphertext)));
      const ivB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData.iv)));

      // Prepare additional fields for password protection
      const requestData: any = {
        ciphertext: ciphertextB64,
        iv: ivB64,
        isProtected,
      };

      if (isProtected && encryptedData.salt && encryptedData.encryptedKey && encryptedData.keyIv) {
        requestData.encryptedKey = btoa(String.fromCharCode(...new Uint8Array(encryptedData.encryptedKey)));
        requestData.keyIv = btoa(String.fromCharCode(...new Uint8Array(encryptedData.keyIv)));
        requestData.salt = btoa(String.fromCharCode(...new Uint8Array(encryptedData.salt)));
      }

      // Add title
      requestData.title = title || null;

      console.log('Create form - Request data:', {
        title,
        authorName,
        authorEmail,
        maxViews,
        requestData
      });

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const { id } = await response.json();

      // For password-protected notes, don't include the key in URL
      if (isProtected) {
        const url = `${window.location.origin}/n/${id}`;
        setShareUrl(url);
      } else {
        // For regular notes, include the stored key in URL
        const url = `${window.location.origin}/n/${id}#${keyString}`;
        setShareUrl(url);
      }
    } catch (error) {
      console.error('Create note error:', error);
      alert('Fehler beim Erstellen der Note');
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (uploadedImages.length >= 10) {
          alert('Maximum 10 images allowed per note.');
          return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          alert(`File ${file.name} is too large. Maximum size is 10MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const imageData = {
              id: Date.now() + Math.random().toString(36).substr(2, 9),
              file: file,
              url: result
            };
            setUploadedImages(prev => [...prev, imageData]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input
    event.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image.`);
          return;
        }

        if (uploadedImages.length >= 10) {
          alert('Maximum 10 images allowed per note.');
          return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          alert(`File ${file.name} is too large. Maximum size is 10MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const imageData = {
              id: Date.now() + Math.random().toString(36).substr(2, 9),
              file: file,
              url: result
            };
            setUploadedImages(prev => [...prev, imageData]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dialog handlers
  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      editor?.chain().focus().insertContent(`<a href="${linkUrl}" target="${linkTarget}" ${linkTitle ? `title="${linkTitle}"` : ''} rel="noopener noreferrer">${linkText}</a>`).run();
    } else if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({
        href: linkUrl,
        target: linkTarget,
        ...(linkTitle && { title: linkTitle })
      }).run();
    }
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
    setLinkTarget('_blank');
    setLinkDialogOpen(false);
  };

  const handleInsertEmoji = (emoji: string) => {
    editor?.chain().focus().insertContent(emoji).run();
    setEmojiDialogOpen(false);
  };

  if (shareUrl) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Lock className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">VAULTNOTE</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Success Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
                <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Note Created Successfully</span>
              </div>

              <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Your secure note is</span>
                <span className="block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  ready to share
                </span>
              </h1>

              <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Your note has been encrypted and stored securely. Share the link below with the intended recipient.
              </p>

              <div className="max-w-2xl mx-auto mb-12">
                <label className="block text-sm font-medium mb-3">Secure Share Link</label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="px-6"
                  >
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link href="/create">
                    <FileText className="mr-2 h-5 w-5" />
                    Create Another Note
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Lock className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">VAULTNOTE</span>
            </Link>
          </div>

          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="/" className="transition-colors hover:text-foreground text-muted-foreground">
              Home
            </Link>
            <Link href="/features" className="transition-colors hover:text-foreground text-muted-foreground">
              Features
            </Link>
            <Link href="/security" className="transition-colors hover:text-foreground text-muted-foreground">
              Security
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground text-muted-foreground">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="default" size="sm">
              <Link href="/create">
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Create Note
              </Link>
            </Button>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/security"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Secure Note Creation</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Create secure</span>
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  encrypted notes
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Your notes are encrypted end-to-end and stored securely. Only you and those you share the link with can access them. Create private, self-destructing notes with military-grade security.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#how-it-works" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
                  How it works
                </Link>
                <Link href="/security" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 text-base shadow-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                  Security details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-6">
          <form className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-0">
              {/* Left Column - Editor */}
              <div className="border-r border-border/50 p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">Title</Label>
                  <Input id="title" placeholder="Note title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-4">
                  <MenuBar
                    editor={editor}
                    linkDialogOpen={linkDialogOpen}
                    setLinkDialogOpen={setLinkDialogOpen}
                    emojiDialogOpen={emojiDialogOpen}
                    setEmojiDialogOpen={setEmojiDialogOpen}
                    linkUrl={linkUrl}
                    setLinkUrl={setLinkUrl}
                    linkText={linkText}
                    setLinkText={setLinkText}
                    linkTitle={linkTitle}
                    setLinkTitle={setLinkTitle}
                    linkTarget={linkTarget}
                    setLinkTarget={setLinkTarget}
                    handleInsertLink={handleInsertLink}
                    handleInsertEmoji={handleInsertEmoji}
                  />
                  <div className="border rounded-lg overflow-hidden hover:shadow-sm focus-within:shadow-md focus-within:shadow-primary/10 transition-all duration-200 bg-background">
                    <div className="relative min-h-[450px] p-4">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="image-upload" className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image h-4 w-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                        Add Image
                      </Label>
                      <span className="text-xs text-muted-foreground">(JPEG, PNG, GIF or WebP • Maximum 10MB)</span>
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:bg-muted/50"
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}>
                      <input id="image-upload" accept="image/jpeg,image/png,image/gif,image/webp" multiple className="hidden" type="file" onChange={handleImageUpload} />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload h-10 w-10 text-muted-foreground"></svg>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Click or drag and drop to upload one or more images</p>
                            <p className="text-xs text-muted-foreground">Uploaded images will be automatically added to the note content</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Uploaded Images */}
                    {uploadedImages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">
                            Uploaded images ({uploadedImages.length}/10)
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group border rounded-lg overflow-hidden bg-muted/30">
                              <div className="aspect-square relative">
                                <img
                                  src={image.url}
                                  alt={image.file.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    onClick={() => removeImage(image.id)}
                                    className="bg-destructive text-destructive-foreground rounded px-3 py-1 text-xs font-medium hover:bg-destructive/90 transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              <div className="p-2">
                                <p className="text-xs text-muted-foreground truncate" title={image.file.name}>
                                  {image.file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(image.file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Settings */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Note Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure your note's privacy and expiration settings.</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authorName" className="text-base font-medium">Author Name</Label>
                    <Input id="authorName" placeholder="Author name (optional)" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authorEmail" className="text-base font-medium">Email</Label>
                    <Input id="authorEmail" type="email" placeholder="example@email.com (optional)" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} className="h-12" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry" className="flex items-center gap-2 text-base font-medium">
                      <Clock className="h-4 w-4" />
                      Expiration Period
                    </Label>
                    <Select value={expiry} onValueChange={setExpiry}>
                      <SelectTrigger className="w-full mt-2 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="1d">1 day</SelectItem>
                        <SelectItem value="1w">1 week</SelectItem>
                        <SelectItem value="1m">1 month</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="protected" checked={isProtected} onCheckedChange={setIsProtected} />
                      <Label htmlFor="protected" className="flex items-center gap-2 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key h-4 w-4"></svg>
                        Password protection
                      </Label>
                    </div>
                  </div>
                  {isProtected && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter a secure password (min. 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12"
                      />
                      <p className="text-xs text-muted-foreground">
                        This password will be required to view the note. Keep it safe!
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <Button type="button" onClick={handleCreate} disabled={!editor?.getText().trim() || isCreating} className="w-full h-12 text-base font-medium">
                    {isCreating ? 'Creating Note...' : 'Create Secure Note'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 fixed right-4 transition-all duration-300 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } bottom-4`}
        type="button"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-background to-background/80 border-t border-border/60">
        <div className="mx-auto max-w-screen-xl px-6 py-16 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Lock className="h-10 w-10 text-primary" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    VaultNote
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">Secure Communication Platform</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
                Advanced zero-knowledge encryption with Swiss hosting infrastructure.
                Your privacy, secured by design.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-3 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Zero-Knowledge</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Swiss Hosting</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Platform
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/create" className="group flex items-center text-muted-foreground hover:text-foreground transition-all duration-200">
                    <span className="text-sm font-medium">Create Secure Note</span>
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@vaultnote.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <p className="text-sm text-muted-foreground font-medium">
                  © 2025 VaultNote. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🇨🇭</span>
                    <span>Made in Switzerland</span>
                  </div>
                  <span className="text-muted-foreground/50">•</span>
                  <span>Open Source</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>No Tracking</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href="https://discord.gg/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord Community"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 3.279 1.793 7.052 0a.077.077 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span className="text-sm font-medium">Discord</span>
                </a>
                <a
                  href="https://twitter.com/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm font-medium">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
