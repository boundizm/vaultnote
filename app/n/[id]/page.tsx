'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Shield, Clock, Eye, AlertTriangle, Lock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { decrypt, stringToKey, decryptWithPassword } from '@/lib/crypto';

export default function NotePage() {
  const params = useParams();
  const id = params.id as string;
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [remainingReads, setRemainingReads] = useState<number | null>(null);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [noteInfo, setNoteInfo] = useState({
    authorName: '',
    authorEmail: '',
    createdAt: '',
    expiresAt: '',
    isExpired: false,
    viewCount: 0,
    maxViews: null as number | null
  });
  const [images, setImages] = useState<any[] | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>('');

  useEffect(() => {
    const loadNote = async () => {
      try {
        // Fetch encrypted note
        const response = await fetch(`/api/notes/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = 'Note nicht gefunden oder abgelaufen';

          switch (response.status) {
            case 404:
              errorMessage = 'Die Note wurde nicht gefunden oder ist bereits abgelaufen.';
              break;
            case 403:
              errorMessage = 'Zugriff verweigert. Überprüfe den Link oder das Passwort.';
              break;
            case 410:
              errorMessage = 'Diese Note wurde bereits gelesen und ist nicht mehr verfügbar.';
              break;
            case 429:
              errorMessage = 'Zu viele Anfragen. Bitte warte einen Moment.';
              break;
            default:
              errorMessage = errorData.error || errorMessage;
          }

          setError(errorMessage);
          setLoading(false);
          return;
        }

        const { ciphertext, iv, remainingReadsPreview, isProtected: protectedFlag, encryptedKey, keyIv, salt, images: noteImages, title, authorName, authorEmail, createdAt, expiresAt, viewCount, maxViews } = await response.json();

      console.log('API Response:', { protectedFlag, encryptedKey, keyIv, salt });

      setIsProtected(protectedFlag || false);
      setImages(noteImages);
      setNoteTitle(title || '');

      // Set note information
      setNoteInfo({
        authorName: authorName || 'Anonymous',
        authorEmail: authorEmail || '',
        createdAt: createdAt || '',
        expiresAt: expiresAt || '',
        isExpired: false,
        viewCount: viewCount || 0,
        maxViews: maxViews
      });

      if (protectedFlag) {
        // Password-protected note - wait for user input
        setLoading(false);
        return;
      }

        // Regular note - decrypt with URL key
        const hash = window.location.hash.slice(1); // Remove #
        if (!hash) {
          setError('Kein Schlüssel in der URL gefunden. Überprüfe den Share-Link.');
          setLoading(false);
          return;
        }

        // Decrypt
        const key = await stringToKey(hash);
        const ciphertextBuffer = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
        const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

        const decrypted = await decrypt(ciphertextBuffer.buffer, ivBuffer, key);
        setContent(decrypted);
        setRemainingReads(remainingReadsPreview);
      } catch (err) {
        console.error('Load note error:', err);
        setError('Fehler beim Laden der Note.');
      } finally {
        if (!isProtected) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadNote();
    }
  }, [id, isProtected]);

  // Check if note should self-destruct
  useEffect(() => {
    if (noteInfo.maxViews && noteInfo.viewCount >= noteInfo.maxViews) {
      setError('Diese Note wurde bereits die maximale Anzahl an Malen gelesen und ist daher nicht mehr verfügbar.');
    } else if (noteInfo.expiresAt && new Date(noteInfo.expiresAt) < new Date()) {
      setError('Diese Note ist abgelaufen und nicht mehr verfügbar.');
    }
  }, [noteInfo]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setPasswordError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`);
      if (!response.ok) {
        throw new Error('Note not found');
      }

      const { ciphertext, iv, remainingReadsPreview, encryptedKey, keyIv, salt, title, authorName, authorEmail, createdAt, expiresAt, viewCount, maxViews } = await response.json();

      if (!encryptedKey || !keyIv || !salt) {
        throw new Error('Invalid password-protected note');
      }

      // Decrypt with password
      const ciphertextBuffer = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
      const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
      const encryptedKeyBuffer = Uint8Array.from(atob(encryptedKey), c => c.charCodeAt(0));
      const keyIvBuffer = Uint8Array.from(atob(keyIv), c => c.charCodeAt(0));
      const saltBuffer = Uint8Array.from(atob(salt), c => c.charCodeAt(0));

      const decrypted = await decryptWithPassword(
        ciphertextBuffer.buffer,
        ivBuffer,
        encryptedKeyBuffer.buffer,
        keyIvBuffer,
        saltBuffer,
        password
      );

      setContent(decrypted);
      setRemainingReads(remainingReadsPreview);
      setNoteTitle(title || '');

      // Set note information
      setNoteInfo({
        authorName: authorName || 'Anonymous',
        authorEmail: authorEmail || '',
        createdAt: createdAt || '',
        expiresAt: expiresAt || '',
        isExpired: false,
        viewCount: viewCount || 0,
        maxViews: maxViews
      });

      setLoading(false);
    } catch (err) {
      console.error('Password decrypt error:', err);
      setPasswordError('Falsches Passwort. Überprüfe deine Eingabe.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-surface-100 mb-2">Note wird geladen...</h2>
          <p className="text-surface-400">Bitte warten, deine sichere Note wird vorbereitet.</p>
        </div>
      </div>
    );
  }

  if (isProtected && !content) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-md mx-auto p-6 pt-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Zurück zur Startseite
            </Link>
          </div>

          {/* Password Form */}
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-4">
              Passwortgeschützte Note
            </h1>

            <p className="text-muted-foreground mb-6">
              Diese Note ist mit einem Passwort geschützt. Gib das Passwort ein, um sie zu entschlüsseln.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Passwort eingeben"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
              >
                {loading ? 'Entschlüsseln...' : 'Note entschlüsseln'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-900">
        <div className="max-w-md mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-surface-400 hover:text-surface-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Zurück zur Startseite
            </Link>
          </div>

          {/* Error Card */}
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-accent-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent-700/50">
              <AlertTriangle className="h-8 w-8 text-accent-400" />
            </div>

            <h1 className="text-2xl font-bold text-surface-100 mb-4">
              Note nicht verfügbar
            </h1>

            <p className="text-surface-400 mb-8">
              {error}
            </p>

            <Link
              href="/create"
              className="btn-primary"
            >
              Neue Note erstellen
            </Link>
          </div>
        </div>
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {isProtected ? 'Password Protected' : 'End-to-End Encrypted'}
              </span>
            </div>

            {remainingReads !== null && (
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border">
                <Eye className="h-4 w-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700">
                  {remainingReads} reads left
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content - Left Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              {/* Title */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-white" />
                  <h1 className="text-2xl font-bold text-white">
                    {noteTitle || 'Secure Note'}
                  </h1>
                </div>
                <p className="text-primary-100 mt-1">
                  This note has been automatically decrypted and is visible only to you.
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div
                  className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-border dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Images */}
                {images && images.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Attachments</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {images.map((image: any, index: number) => (
                        <div key={index} className="border border-border rounded-lg overflow-hidden bg-muted/30">
                          <div className="aspect-square relative">
                            <img
                              src={image.data}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 bg-muted/50">
                            <p className="text-sm font-medium text-foreground truncate" title={image.name}>
                              {image.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(image.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Warning Footer */}
              <div className="bg-amber-50/10 border-t border-border px-8 py-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-amber-400 mb-1">
                      Security Notice
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This note may no longer be available after closing this page.
                      Copy any important information before leaving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    {isProtected ? 'Password Protected' : 'End-to-End Encrypted'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">AES-256-GCM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Zero-Knowledge</span>
                </div>
              </div>
            </div>

            {/* Note Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Note Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Author</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.authorEmail ? (
                      <span>{noteInfo.authorName} ({noteInfo.authorEmail})</span>
                    ) : (
                      <span>{noteInfo.authorName}</span>
                    )}
                  </p>
                </div>

                {remainingReads !== null && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Remaining Reads</label>
                    <p className="text-sm text-foreground mt-1">{remainingReads}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Encryption</label>
                  <p className="text-sm text-foreground mt-1">Military Grade</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Views</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.viewCount} of {noteInfo.maxViews ? noteInfo.maxViews : '∞'} views
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.createdAt ? new Date(noteInfo.createdAt).toLocaleString() : 'Unknown'}
                  </p>
                </div>

                {noteInfo.expiresAt && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expires</label>
                    <p className="text-sm text-foreground mt-1">
                      {new Date(noteInfo.expiresAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <Button asChild size="lg" className="w-full h-12 text-base">
                <Link href="/create">
                  <FileText className="mr-2 h-5 w-5" />
                  Create Another Note
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
