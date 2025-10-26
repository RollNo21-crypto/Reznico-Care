import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Play, Asterisk, Mail, Send, CheckCircle, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import bannerVideo from '@/assets/banner-video.mp4'
import logo from '@/assets/logo-white.png'
export function LandingPage({ onGetStarted }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleContactSubmit = async () => {
    setIsSubmitting(true)
    // FormSubmit.io will handle the actual submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsContactOpen(false)
        setIsSubmitted(false)
      }, 2000)
    }, 1000)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-70"
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          <div className="flex items-center gap-2">

            <div className="flex items-center gap-2">
              <img src={logo} alt="Reznico Logo" className="h-8 w-auto md:h-10 lg:h-12" />
            </div>
          </div>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="rounded-full bg-[#D4FF00] px-6 py-5 text-sm font-semibold text-black hover:bg-[#C4EF00] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 md:px-8 md:py-6 md:text-base"
          >
            Take a Demo
          </Button>
        </header>

        {/* Hero Content */}
        <div className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 md:pb-16 lg:px-16 lg:pb-20">
          <div className="w-full space-y-6 md:space-y-8">
            

            {/* Large Brand Text */}
            <div className="flex items-end gap-3 md:gap-4">
              <h2 className="text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl leading-none">
                reznico care 
              </h2>
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="group mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4FF00] transition-all duration-300 hover:scale-110 hover:shadow-2xl md:mb-3 md:h-16 md:w-16 lg:h-20 lg:w-20 flex-shrink-0"
              >
                <ArrowUpRight className="h-7 w-7 text-black transition-transform group-hover:rotate-45 md:h-8 md:w-8 lg:h-10 lg:w-10" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Us Button (Bottom Right) */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsContactOpen(true)}
            className="group rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md px-5 py-5 text-white hover:bg-white/20 transition-all duration-300 md:px-6 md:py-6"
          >
            <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Contact Us</span>
          </Button>
        </div>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
                <DialogDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </DialogDescription>
              </DialogHeader>
              
              <form 
                action="https://formsubmit.co/gokarnkark09@gmail.com" 
                method="POST"
                onSubmit={handleContactSubmit}
                className="space-y-4"
              >
                {/* FormSubmit.io Configuration */}
                <input type="hidden" name="_subject" value="New Contact Form - Reznico Care" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    required
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1 h-11"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setIsContactOpen(false)}
                    className="h-11"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
