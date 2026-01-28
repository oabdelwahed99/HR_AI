import { MessageTemplate, MessageTone, Employee, Course } from "@/types/hr";

/**
 * Message Templates for Ghostwriter Suite
 * AI-powered message generation with customizable tones
 */

export interface MessageTemplateConfig {
  type: "Celebration" | "Motivation" | "Notification";
  tone: MessageTone;
  generate: (employee: Employee, context?: any) => MessageTemplate;
}

/**
 * Celebration Template: "Big win! You've closed your [Gap Name] gap..."
 */
export function generateCelebrationMessage(
  employee: Employee,
  gapName?: string,
  tone: MessageTone = "Celebratory"
): MessageTemplate {
  const gap = gapName || employee.gapAnalysis?.competencyGaps[0]?.name || "skill gap";
  
  const templates = {
    Celebratory: {
      subject: `🎉 Congratulations on Closing Your ${gap}!`,
      body: `Hi ${employee.firstName},

Big win! You've closed your ${gap} gap and demonstrated exceptional growth. Your dedication to professional development is truly inspiring.

This achievement positions you well for your next career milestone. Keep up the outstanding work!

Best regards,
HR-OS Pulse Team`,
    },
    Professional: {
      subject: `Achievement: ${gap} Competency Gap Closed`,
      body: `Dear ${employee.firstName},

We are pleased to inform you that you have successfully closed your ${gap} competency gap. This demonstrates your commitment to continuous improvement and professional development.

Your progress has been noted and will be considered in future career planning discussions.

Regards,
HR-OS Pulse`,
    },
    Friendly: {
      subject: `Way to go, ${employee.firstName}! 🎊`,
      body: `Hey ${employee.firstName},

Just wanted to give you a shout-out - you've closed your ${gap} gap! That's awesome work and shows real dedication to your growth.

Keep crushing it!

Cheers,
HR Team`,
    },
  };

  const selectedTemplate = templates[tone] || templates.Celebratory;

  return {
    id: `msg-${Date.now()}`,
    type: "Celebration",
    tone,
    recipientId: employee.id,
    subject: selectedTemplate.subject,
    body: selectedTemplate.body,
    generatedAt: new Date().toISOString(),
    aiRationale: `Generated celebration message for ${employee.firstName} ${employee.lastName} closing their ${gap} competency gap. Tone: ${tone}. This recognizes their achievement and reinforces positive behavior.`,
  };
}

/**
 * Motivation Template: "We noticed you're 70% through [Course Name]. Finish strong to unlock your next level!"
 */
export function generateMotivationMessage(
  employee: Employee,
  course?: Course,
  tone: MessageTone = "Motivational"
): MessageTemplate {
  const track = employee.trainingTracks[0];
  const courseName = course?.title || track?.courses[0]?.title || "your training track";
  const progress = track?.progress || 0;

  const templates = {
    Motivational: {
      subject: `You're ${progress}% There - Finish Strong! 💪`,
      body: `Hi ${employee.firstName},

We noticed you're ${progress}% through ${courseName}. You're so close to the finish line!

Finishing strong will unlock your next level and demonstrate your commitment to growth. You've got this!

Let's push through together.

Best,
HR-OS Pulse Team`,
    },
    Supportive: {
      subject: `Supporting Your Journey: ${courseName}`,
      body: `Dear ${employee.firstName},

We see you're making great progress on ${courseName} (${progress}% complete). We're here to support you in completing this important training.

If you need any assistance or have questions, please don't hesitate to reach out.

Warm regards,
HR-OS Pulse`,
    },
    Professional: {
      subject: `Training Progress Update: ${courseName}`,
      body: `Dear ${employee.firstName},

This is a reminder that you are currently ${progress}% through ${courseName}. Completing this training track is important for your professional development and career progression.

Please continue your progress to meet the completion deadline.

Regards,
HR-OS Pulse`,
    },
  };

  const selectedTemplate = templates[tone] || templates.Motivational;

  return {
    id: `msg-${Date.now()}`,
    type: "Motivation",
    tone,
    recipientId: employee.id,
    subject: selectedTemplate.subject,
    body: selectedTemplate.body,
    generatedAt: new Date().toISOString(),
    aiRationale: `Generated motivation message for ${employee.firstName} ${employee.lastName} at ${progress}% completion of ${courseName}. Tone: ${tone}. This encourages completion and reinforces the value of finishing the training track.`,
  };
}

/**
 * Nudge Template: "Your annual review is coming up. Closing your Technical Core tracks now will strengthen your promotion case."
 */
export function generateNudgeMessage(
  employee: Employee,
  reviewDate?: string,
  tone: MessageTone = "Professional"
): MessageTemplate {
  const review = reviewDate || "in the coming months";
  const incompleteTracks = employee.trainingTracks.filter(t => t.completionStatus !== "Completed");
  const trackNames = incompleteTracks.map(t => t.name).join(", ") || "your training tracks";

  const templates = {
    Professional: {
      subject: `Upcoming Review: Complete Your Training Tracks`,
      body: `Dear ${employee.firstName},

Your annual review is coming up ${review}. Closing your ${trackNames} now will strengthen your promotion case and demonstrate your commitment to professional growth.

We recommend prioritizing completion of these tracks before your review period.

Best regards,
HR-OS Pulse`,
    },
    Supportive: {
      subject: `Friendly Reminder: Review Preparation`,
      body: `Hi ${employee.firstName},

Just a friendly reminder that your annual review is ${review}. Completing your ${trackNames} would be a great way to showcase your development and strengthen your case for advancement.

We're here to support you in this process.

Warm regards,
HR-OS Pulse Team`,
    },
    Motivational: {
      subject: `Level Up Before Your Review! 🚀`,
      body: `Hey ${employee.firstName},

Your annual review is ${review} - this is your chance to shine! Closing your ${trackNames} now will give you a strong story to tell about your growth and commitment.

Let's make sure you're positioned for success!

Best,
HR-OS Pulse`,
    },
  };

  const selectedTemplate = templates[tone] || templates.Professional;

  return {
    id: `msg-${Date.now()}`,
    type: "Notification",
    tone,
    recipientId: employee.id,
    subject: selectedTemplate.subject,
    body: selectedTemplate.body,
    generatedAt: new Date().toISOString(),
    aiRationale: `Generated nudge message for ${employee.firstName} ${employee.lastName} regarding upcoming review ${review}. Incomplete tracks: ${trackNames}. Tone: ${tone}. This encourages timely completion to strengthen their review case.`,
  };
}
