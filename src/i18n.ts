import i18n from "i18next";
import type { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGE_STORAGE_KEY = "manonirmaan-language";
export const supportedLanguages = ["en", "hi"] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

export const languageOptions: Array<{
  code: AppLanguage;
  labelKey: string;
  shortLabelKey: string;
}> = [
  { code: "en", labelKey: "language.english", shortLabelKey: "language.shortEnglish" },
  { code: "hi", labelKey: "language.hindi", shortLabelKey: "language.shortHindi" },
];

export function getSupportedLanguage(value: string | null | undefined): AppLanguage {
  const normalized = value?.toLowerCase().split("-")[0];
  return normalized === "hi" ? "hi" : "en";
}

const resources: Resource = {
  en: {
    translation: {
      language: {
        label: "Site language",
        english: "English",
        hindi: "Hindi",
        shortEnglish: "EN",
        shortHindi: "HI",
      },
      common: {
        brand: "ManoNirmaan",
        email: "manonirmaan@gmail.com",
        phoneDisplay: "919196421388",
        phoneHref: "919196421388",
        addressLine1: "Chiraigaon, Near Block Office",
        addressLine2: "Varanasi, Uttar Pradesh 221112",
        restore: "Restore",
        reconnect: "Reconnect",
        rebuild: "Rebuild",
        bookSession: "Book Session",
        bookASession: "Book a session",
        bookInitialConsultation: "Book an initial consultation",
        readFullStory: "Meet the full team",
        exploreServices: "Explore services",
        learnWhatToExpect: "Learn what to expect",
      },
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        approach: "Approach",
        contact: "Contact",
      },
      meta: {
        rootTitle: "ManoNirmaan - A quiet space for the mind",
        rootDescription:
          "Compassionate mental health, counselling, special education and community medicine support from the ManoNirmaan team. Online and in-person sessions in Varanasi.",
      },
      root: {
        notFoundTitle: "Page not found",
        notFoundBody: "The page you're looking for doesn't exist or has been moved.",
        pageDidNotLoad: "This page didn't load",
        loadErrorBody:
          "Something went wrong on our end. You can try refreshing or head back home.",
        goHome: "Go home",
        tryAgain: "Try again",
      },
      header: {
        tagline: "Restore - Reconnect - Rebuild",
      },
      footer: {
        tagline: "Care held by a team",
        description:
          "A quiet space for clarity, healing, learning and growth - guided by a multidisciplinary team and held with care.",
        visit: "Visit",
        reach: "Reach",
        book: "Book a session ->",
        copyright: "(c) {{year}} ManoNirmaan. All rights reserved.",
        credentials: "Clinical psychology | counselling | special education | community medicine",
      },
      profile: {
        name: "ManoNirmaan Team",
        credentials: [
          "Clinical Psychology",
          "Education & Counselling Psychology",
          "Special Education",
          "Community Medicine",
        ],
        shortCredentials:
          "Clinical psychology | counselling | special education | community medicine",
      },
      concerns: {
        home: [
          "Anxiety",
          "Depression",
          "Trauma & PTSD",
          "OCD",
          "ADHD / Autism",
          "Bereavement",
          "Complex Trauma",
          "Domestic Abuse",
          "Family Issues",
          "Infertility / Miscarriage",
          "Intimacy Issues",
          "Low Self-Confidence",
          "Menopause",
          "Chronic Illness / Pain",
          "Relationships",
          "Dissociation",
          "Sexual Abuse",
          "Life Transitions",
        ],
        services: [
          "Abortion",
          "ADHD / Autism",
          "Anxiety",
          "Bereavement",
          "Child Sexual Abuse",
          "Complex Trauma",
          "Depression",
          "Dissociation",
          "Domestic Abuse",
          "Family Issues",
          "Infertility / Miscarriage",
          "Intimacy Issues",
          "Low Self-Confidence",
          "Menopause",
          "Chronic Illness / Pain",
          "Obsessive Compulsive Disorder (OCD)",
          "Post-Traumatic Stress Disorder (PTSD)",
          "Relationships",
          "Sexual Abuse",
          "Trauma",
        ],
      },
      home: {
        metaTitle: "ManoNirmaan - Mental Health & Learning Support in Varanasi",
        metaDescription:
          "A quiet space for the mind. Compassionate clinical psychology, counselling, special education and community medicine support. Online & in-person sessions in Varanasi.",
        ogTitle: "ManoNirmaan - A quiet space for the mind",
        ogDescription:
          "Restore. Reconnect. Rebuild. Care from the ManoNirmaan multidisciplinary team.",
        hero: {
          titleBefore: "A quiet space for the",
          titleMind: "mind",
          titleEmphasis: "to find yourself.",
          body:
            "Helping you create a life rooted in resilience and inner strength - with clinical psychology, counselling, learning support and community medicine working together. Online and in-person care in Varanasi.",
          meet: "Meet the team",
        },
        intro: {
          items: [
            { n: "01", t: "Restore", d: "Find balance in body and mind." },
            { n: "02", t: "Reconnect", d: "Return to your inner voice." },
            { n: "03", t: "Rebuild", d: "Grow stronger emotional roots." },
          ],
        },
        aboutPreview: {
          quote:
            "Some things are too heavy to carry alone and too important to keep burying.",
          eyebrow: "Our team",
          heading: "Five people, one shared care space.",
          p1:
            "ManoNirmaan is a team-oriented space bringing together clinical psychology, counselling, inclusive education and community medicine.",
          p2:
            "Each person who reaches out is met with care shaped around their needs - whether the concern is emotional wellbeing, learning support, accessibility, family stress, or whole-person health.",
        },
        why: {
          eyebrow: "Why choose the ManoNirmaan team?",
          heading: "Care held with warmth, discretion and shared expertise.",
          items: [
            {
              t: "Safe, Non-Judgmental Space for Growth",
              d:
                "We create a warm, non-judgmental, and emotionally safe environment where you can explore thoughts, feelings and experiences at your own pace.",
            },
            {
              t: "Qualified & Collaborative Care",
              d:
                "Our team brings clinical psychology, counselling, special education and community medicine perspectives together for care that is thoughtful and practical.",
            },
            {
              t: "Compassionate & Client-Centred Approach",
              d:
                "Support works best when a person feels genuinely heard, understood and respected. We keep the process collaborative so clients feel empowered in their healing journey.",
            },
            {
              t: "Experience With Diverse Mental Health Concerns",
              d:
                "We support children, adolescents and adults facing concerns such as anxiety, depression, trauma, OCD, emotional difficulties, educational challenges and family stress.",
            },
            {
              t: "Flexible & Accessible Support",
              d:
                "Online and offline consultation options help make support more accessible, comfortable and convenient according to your needs.",
            },
          ],
        },
        support: {
          eyebrow: "Areas of support",
          heading: "Mental health, counselling and learning support.",
          body:
            "Working with children, adolescents, adults and families - meeting each person where they are, with support tailored to their unique story.",
        },
        cta: {
          eyebrow: "You matter. You're heard.",
          heading: "Let's make you the author of your own life again.",
          button: "Book initial consultation",
        },
      },
      about: {
        metaTitle: "About the ManoNirmaan Team - ManoNirmaan",
        metaDescription:
          "Meet the ManoNirmaan team offering clinical psychology, counselling, special education and community medicine support in Varanasi and online.",
        ogTitle: "About the ManoNirmaan Team - ManoNirmaan",
        ogDescription: "A multidisciplinary team for mental health, learning and accessible care.",
        eyebrow: "About our team",
        heading: "ManoNirmaan is built around collaborative care.",
        paragraphs: [
          "ManoNirmaan is a team-oriented mental health and learning support space where people do not have to carry difficult things alone or keep important pain buried.",
          "Our five-member team brings together clinical psychology, counselling psychology, special education for hearing impairment, educational guidance and community medicine.",
          "This collaborative model helps us look at the whole person - emotions, relationships, learning needs, accessibility, family context, body health and community wellbeing.",
          "We work with children, adolescents, adults and families through a safe, compassionate and non-judgmental process shaped around each person's needs.",
          "Together, we create a care space focused on healing, emotional growth, self-understanding, accessible learning and rebuilding inner strength.",
        ],
        strengths: {
          items: [
            {
              t: "Clinical care",
              d: "RCI licensed and registered clinical psychology support for assessment, therapy and emotional wellbeing.",
            },
            {
              t: "Counselling support",
              d: "Education and counselling psychology guidance for students, families and people navigating life challenges.",
            },
            {
              t: "Accessible learning",
              d: "Special education support that creates inclusive pathways for learners with hearing impairment.",
            },
            {
              t: "Whole-person health",
              d: "Community medicine insight that keeps body health, context and support systems in view.",
            },
          ],
        },
        mano: {
          eyebrow: "About ManoNirmaan",
          mind: "mind",
          reconstruction: "reconstruction",
          body:
            "ManoNirmaan represents the gentle reconstruction of the inner self through compassion, evidence-informed care, accessible learning support and steady presence. A space for healing, resilience and self-growth - for anyone navigating life's difficult chapters with a desire for clarity.",
        },
        teamEyebrow: "Meet the team",
        teamHeading:
          "Members supporting mental health, learning, accessibility and community wellbeing.",
        values: {
          visionTitle: "Our Vision",
          vision:
            "Everyone who walks through our door should feel heard and receive personalized care. We are not here to blanket everyone with the same approach. You matter. You're heard.",
          missionTitle: "Our Mission",
          mission:
            "To be a safe, non-judgmental, confidential and fully supportive space for all individuals - regardless of age and stage of life - and to contribute to a more inclusive, caring community.",
          valuesTitle: "Our Values",
          items: ["Honesty", "Respect", "Integrity", "Conscientiousness"],
        },
      },
      services: {
        metaTitle: "Services & Therapies - ManoNirmaan",
        metaDescription:
          "Clinical psychology, counselling, inclusive learning support and community medicine perspectives. A curated range of services, online and in-person.",
        ogTitle: "Services & Therapies - ManoNirmaan",
        ogDescription: "Support thoughtfully tailored to you.",
        eyebrow: "What we offer",
        titleBefore: "Support thoughtfully",
        titleEmphasis: "tailored",
        titleAfter: "to you.",
        intro:
          "A curated range of services delivered with warmth, discretion and collaborative, evidence-informed care.",
        modalities: [
          {
            t: "Integrative Counselling",
            d: "Drawing from multiple evidence-based approaches, tailored to you.",
          },
          {
            t: "Cognitive Behavioural Therapy (CBT)",
            d: "Reframing thought patterns that shape how you feel and act.",
          },
          {
            t: "Dialectical Behaviour Therapy (DBT)",
            d: "Skills for emotional regulation, distress tolerance and mindfulness.",
          },
          {
            t: "Acceptance & Commitment Therapy (ACT)",
            d: "Living a values-led life while making room for difficult emotions.",
          },
          {
            t: "Behaviour Modification",
            d: "Structured approaches for behavioural change and habit formation.",
          },
          {
            t: "Person-Centred Therapy",
            d: "A relational space rooted in empathy, authenticity and unconditional regard.",
          },
          {
            t: "Mindfulness-Based Therapy",
            d: "Cultivating present-moment awareness as a foundation for healing.",
          },
          {
            t: "Couple Therapy",
            d: "Repairing communication, intimacy and connection together.",
          },
          {
            t: "Family Therapy",
            d: "Working with the family system to support each member's wellbeing.",
          },
        ],
        concernsEyebrow: "Concerns we support",
        concernsHeading: "A wide range of mental health, learning and wellbeing concerns.",
        pricingEyebrow: "Pricing",
        pricingHeading: "Sessions available online & in-person.",
        pricingBody: "Fees are shared transparently following your initial consultation.",
      },
      approach: {
        metaTitle: "Our Care Approach - ManoNirmaan",
        metaDescription:
          "A relational, integrative approach to support - recognising and nurturing the strengths that brought you here. Initial assessment, frequency, and ongoing review.",
        ogTitle: "Our Care Approach - ManoNirmaan",
        ogDescription: "Relational, integrative, collaborative and evidence-informed support.",
        eyebrow: "Our care approach",
        titleBefore: "Not about",
        titleEmphasis: "fixing you",
        titleAfter: "- about nurturing the strengths that brought you here.",
        p1:
          "Support at ManoNirmaan is about recognising, respecting and gently nurturing the strengths that have brought you to this point. We work through a relational, collaborative and integrative approach.",
        relationalLabel: "A relational approach",
        relationalText:
          " means we tailor support according to each individual's unique needs while creating a compassionate, collaborative and non-judgmental space for healing and self-growth.",
        integrativeLabel: "As an integrative team",
        integrativeText:
          ", we draw from different evidence-informed therapeutic, counselling, educational and health perspectives and adapt them according to your unique needs, experiences and goals.",
        expectHeading: "What to expect after your initial consultation",
        steps: [
          {
            n: "01",
            t: "Initial Assessments",
            d:
              "Our first few sessions involve an assessment period to understand your needs, goals and the kind of support that will fit best. This is a collaborative process where we evaluate the care pathway together.",
          },
          {
            n: "02",
            t: "Session Frequency",
            d:
              "There is no fixed number of sessions - support is individualized. If you are dealing with multiple issues, we may focus on one specific area over a few sessions before moving to the next. We agree on frequency together; weekly sessions often help maintain momentum, though fortnightly options may be suitable when needed.",
          },
          {
            n: "03",
            t: "Ongoing Review",
            d:
              "We check progress regularly to keep support aligned with your goals. Reviews every 6-8 sessions, or sooner when needed, help us adjust focus, revisit priorities and respond to your feedback.",
          },
        ],
      },
      contact: {
        metaTitle: "Contact - ManoNirmaan",
        metaDescription:
          "Reach ManoNirmaan in Varanasi. Email manonirmaan@gmail.com or call 919196421388.",
        ogTitle: "Contact - ManoNirmaan",
        ogDescription: "A quiet space for the mind. Get in touch.",
        eyebrow: "Reach us",
        titleBefore: "A quiet space,",
        titleEmphasis: "just a message away",
        titleAfter: ".",
        visit: "Visit",
        email: "Email",
        phone: "Phone",
        responseEyebrow: "A note on response times",
        responseBefore:
          "Messages are responded to within 24-48 hours, Monday to Saturday. If this is a mental health emergency, please contact your nearest hospital. For clinic communication, call",
      },
      booking: {
        metaTitle: "Book a Session - ManoNirmaan",
        metaDescription:
          "Book an initial consultation or support session with the ManoNirmaan team. Online and in-person sessions available in Varanasi.",
        ogTitle: "Book a Session - ManoNirmaan",
        ogDescription: "60-minute support sessions, online & in-person.",
        eyebrow: "Book a session",
        titleBefore: "Take the first step -",
        titleEmphasis: "gently",
        titleAfter: ".",
        intro:
          "To ensure we have established a safe foundation for our work, please only book a full session if we have already completed your initial consultation and agreed to proceed together.",
        card: {
          eyebrow: "Initial consultation",
          title: "60-minute initial consultation",
          subtitle: "with the ManoNirmaan care team",
          duration: "60 minutes",
          frequency: "Weekly or fortnightly",
          online: "Online via secure video",
          videoPlatforms: "Zoom, Google Meet, Microsoft Teams & more",
          offline: "Or in-person, Varanasi",
          note:
            "After you submit your request, the team will reach out within 24-48 hours to confirm a time and share the next steps.",
        },
        success: {
          title: "Thank you.",
          body:
            "Your request has been received. The ManoNirmaan team will be in touch within 24-48 hours.",
        },
        form: {
          title: "Request initial consultation",
          name: "Full name",
          age: "Age",
          email: "Email",
          phone: "Phone",
          sessionType: "Session type",
          online: "Online",
          offline: "In-person, Varanasi",
          videoCallPreference: "Preferred video call platform",
          videoCallHint: "Choose how you would like to connect for your online consultation.",
          videoCallOptions: {
            zoom: "Zoom",
            google_meet: "Google Meet",
            microsoft_teams: "Microsoft Teams",
            no_preference: "No preference",
          },
          date: "Preferred date",
          time: "Preferred time",
          languagePreference: "Preferred session language",
          languageOptions: {
            english: "English",
            hindi: "Hindi",
            either: "Either is fine",
          },
          referralSource: "How did you hear about us?",
          referralOptions: {
            none: "Select an option",
            facebook: "Facebook",
            instagram: "Instagram",
            whatsapp: "WhatsApp",
            friend: "Friend",
            patient: "Through a patient",
            other: "Other",
          },
          referralDetails: "Referral details",
          referralDetailsPlaceholder: "Name, page, group, or any extra detail if you want to share.",
          notes: "What brings you in?",
          notesPlaceholder: "Share a little, if you'd like - only what feels comfortable.",
          submit: "Submit request",
          submitting: "Submitting...",
          orEmail: "Or email",
          newToTherapy: "New to therapy?",
          errorFallback: "Please check the form and try again.",
          submitFailure:
            "Could not submit your request. Please try again or email {{email}}.",
        },
        validation: {
          name: "Please enter your full name.",
          email: "Please enter a valid email address.",
          age: "Please enter a valid age.",
          notes: "Notes must be 2000 characters or fewer.",
          referralDetails: "Referral details must be 200 characters or fewer.",
          videoCallPreference: "Please choose your preferred video call platform.",
        },
      },
      doctor: {
        login: {
          metaTitle: "Doctor Login - ManoNirmaan",
          eyebrow: "Doctor access",
          title: "Doctor login",
          body: "Sign in to view session requests submitted through the website.",
          username: "Username",
          password: "Password",
          submit: "Login",
          submitting: "Checking...",
          invalid: "Invalid doctor credentials.",
          authenticated: "Already logged in.",
          openDashboard: "Open session details",
          securityNote: "This page is for clinic use only.",
        },
        dashboard: {
          metaTitle: "Session Details - ManoNirmaan",
          eyebrow: "Doctor dashboard",
          title: "Session requests",
          body: "Review booking requests submitted through the website.",
          refresh: "Refresh",
          logout: "Logout",
          total: "{{count}} request",
          total_plural: "{{count}} requests",
          empty: "No session requests found.",
          loading: "Loading session requests...",
          error: "Could not load booking data.",
          errorRpcMissing: "Doctor read function is missing in Supabase.",
          errorMissingEnv: "DOCTOR_DASHBOARD_SECRET is missing in .env.",
          errorRpcHint:
            "In Supabase SQL Editor, run scripts from supabase/migrations/20260523120000_doctor_bookings_rpc.sql and 20260523130000_doctor_booking_mutations.sql, then restart npm run dev and log in again.",
          errorEnvHint: "Add DOCTOR_DASHBOARD_SECRET=ManoNirmaan-Doctor-Read-2026 to your .env file.",
          errorLoginHint: "Log out, open /doctor-login, sign in again, then return here.",
          loginRequired: "Doctor login required.",
          goToLogin: "Go to doctor login",
          patient: "Patient",
          contact: "Contact",
          session: "Session",
          preferredSlot: "Preferred slot",
          requestDetails: "Request details",
          status: "Status",
          received: "Received",
          age: "Age",
          phone: "Phone",
          email: "Email",
          type: "Type",
          date: "Date",
          time: "Time",
          notes: "Notes",
          notProvided: "Not provided",
          videoCall: "Video call platform",
          statusPending: "Pending",
          statusConfirmed: "Confirmed",
          statusCancelled: "Cancelled",
          delete: "Delete request",
          deleting: "Deleting...",
          deleteConfirm: "Delete this session request permanently? This cannot be undone.",
          actionFailed: "Could not update this request. Run the latest Supabase SQL, then try again.",
        },
      },
    },
  },
  hi: {
    translation: {
      language: {
        label: "साइट भाषा",
        english: "English",
        hindi: "हिन्दी",
        shortEnglish: "EN",
        shortHindi: "हि",
      },
      common: {
        brand: "ManoNirmaan",
        email: "manonirmaan@gmail.com",
        phoneDisplay: "919196421388",
        phoneHref: "919196421388",
        addressLine1: "चिरईगांव, ब्लॉक ऑफिस के पास",
        addressLine2: "वाराणसी, उत्तर प्रदेश 221112",
        restore: "संतुलन",
        reconnect: "पुनः जुड़ाव",
        rebuild: "पुनर्निर्माण",
        bookSession: "सेशन बुक करें",
        bookASession: "सेशन बुक करें",
        bookInitialConsultation: "प्रारंभिक परामर्श बुक करें",
        readFullStory: "पूरी टीम से मिलें",
        exploreServices: "सेवाएं देखें",
        learnWhatToExpect: "जानें क्या अपेक्षा करें",
      },
      nav: {
        home: "होम",
        about: "परिचय",
        services: "सेवाएं",
        approach: "दृष्टिकोण",
        contact: "संपर्क",
      },
      meta: {
        rootTitle: "ManoNirmaan - मन के लिए एक शांत स्थान",
        rootDescription:
          "ManoNirmaan टीम से करुणामय मानसिक स्वास्थ्य, काउंसलिंग, विशेष शिक्षा और कम्युनिटी मेडिसिन सहयोग। वाराणसी में ऑनलाइन और व्यक्तिगत सेशन उपलब्ध।",
      },
      root: {
        notFoundTitle: "पेज नहीं मिला",
        notFoundBody: "आप जिस पेज को खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया है।",
        pageDidNotLoad: "यह पेज लोड नहीं हुआ",
        loadErrorBody:
          "हमारी ओर से कुछ गलत हो गया। आप फिर से कोशिश कर सकते हैं या होम पर वापस जा सकते हैं।",
        goHome: "होम पर जाएं",
        tryAgain: "फिर कोशिश करें",
      },
      header: {
        tagline: "संतुलन · पुनः जुड़ाव · पुनर्निर्माण",
      },
      footer: {
        tagline: "आपको फिर से स्वयं तक लौटने में साथ",
        description:
          "स्पष्टता, उपचार और विकास के लिए एक शांत स्थान - क्लिनिकल साइकोलॉजी द्वारा निर्देशित, देखभाल के साथ।",
        visit: "पता",
        reach: "संपर्क",
        book: "सेशन बुक करें →",
        copyright: "© {{year}} ManoNirmaan. सर्वाधिकार सुरक्षित।",
        credentials: "क्लिनिकल साइकोलॉजी | काउंसलिंग | विशेष शिक्षा | कम्युनिटी मेडिसिन",
      },
      profile: {
        name: "ManoNirmaan टीम",
        credentials: [
          "क्लिनिकल साइकोलॉजी",
          "एजुकेशन और काउंसलिंग साइकोलॉजी",
          "विशेष शिक्षा",
          "कम्युनिटी मेडिसिन",
        ],
        shortCredentials:
          "क्लिनिकल साइकोलॉजी | काउंसलिंग | विशेष शिक्षा | कम्युनिटी मेडिसिन",
      },
      concerns: {
        home: [
          "चिंता",
          "अवसाद",
          "ट्रॉमा और PTSD",
          "OCD",
          "ADHD / ऑटिज्म",
          "शोक",
          "कॉम्प्लेक्स ट्रॉमा",
          "घरेलू दुर्व्यवहार",
          "पारिवारिक समस्याएं",
          "बांझपन / गर्भपात",
          "निकटता से जुड़ी कठिनाइयां",
          "कम आत्मविश्वास",
          "मेनोपॉज",
          "दीर्घकालिक बीमारी / दर्द",
          "रिश्ते",
          "डिसोसिएशन",
          "यौन दुर्व्यवहार",
          "जीवन में बदलाव",
        ],
        services: [
          "गर्भपात",
          "ADHD / ऑटिज्म",
          "चिंता",
          "शोक",
          "बाल यौन दुर्व्यवहार",
          "कॉम्प्लेक्स ट्रॉमा",
          "अवसाद",
          "डिसोसिएशन",
          "घरेलू दुर्व्यवहार",
          "पारिवारिक समस्याएं",
          "बांझपन / गर्भपात",
          "निकटता से जुड़ी कठिनाइयां",
          "कम आत्मविश्वास",
          "मेनोपॉज",
          "दीर्घकालिक बीमारी / दर्द",
          "ऑब्सेसिव कम्पल्सिव डिसऑर्डर (OCD)",
          "पोस्ट-ट्रॉमेटिक स्ट्रेस डिसऑर्डर (PTSD)",
          "रिश्ते",
          "यौन दुर्व्यवहार",
          "ट्रॉमा",
        ],
      },
      home: {
        metaTitle: "ManoNirmaan - वाराणसी में मानसिक स्वास्थ्य और लर्निंग सपोर्ट",
        metaDescription:
          "मन के लिए एक शांत स्थान। क्लिनिकल साइकोलॉजी, काउंसलिंग, विशेष शिक्षा और कम्युनिटी मेडिसिन सहयोग। वाराणसी में ऑनलाइन और व्यक्तिगत सेशन।",
        ogTitle: "ManoNirmaan - मन के लिए एक शांत स्थान",
        ogDescription:
          "संतुलन। पुनः जुड़ाव। पुनर्निर्माण। ManoNirmaan की बहु-विषयक टीम के साथ सहयोग।",
        hero: {
          titleBefore: "मन के लिए एक शांत स्थान,",
          titleMind: "जहां",
          titleEmphasis: "आप स्वयं से फिर जुड़ सकें।",
          body:
            "आपको ऐसी जिंदगी बनाने में सहयोग जहां लचीलापन और अंदरूनी मजबूती हो - और जहां क्लिनिकल साइकोलॉजी, काउंसलिंग, लर्निंग सपोर्ट और कम्युनिटी मेडिसिन साथ काम करते हैं।",
          meet: "टीम से मिलें",
        },
        intro: {
          items: [
            { n: "01", t: "संतुलन", d: "शरीर और मन में संतुलन पाएं।" },
            { n: "02", t: "पुनः जुड़ाव", d: "अपनी अंदरूनी आवाज तक लौटें।" },
            { n: "03", t: "पुनर्निर्माण", d: "भावनात्मक जड़ों को मजबूत बनाएं।" },
          ],
        },
        aboutPreview: {
          quote:
            "हीलिंग खुद को ठीक करने के बारे में नहीं है - यह अपने उन हिस्सों से फिर जुड़ने के बारे में है जो अनसुने रह गए थे।",
          eyebrow: "मेरे बारे में थोड़ा",
          heading: "पांच लोग, देखभाल की एक साझा जगह।",
          p1:
            "ManoNirmaan एक टीम-ओरिएंटेड स्पेस है जहां क्लिनिकल साइकोलॉजी, काउंसलिंग, समावेशी शिक्षा और कम्युनिटी मेडिसिन साथ आते हैं।",
          p2:
            "हर व्यक्ति को उसकी जरूरतों के अनुसार सहयोग मिलता है - चाहे चिंता भावनात्मक स्वास्थ्य, सीखने, accessibility, परिवार या संपूर्ण स्वास्थ्य से जुड़ी हो।",
        },
        why: {
          eyebrow: "ManoNirmaan टीम क्यों चुनें?",
          heading: "गर्मजोशी, गोपनीयता और साझा विशेषज्ञता के साथ सहयोग।",
          items: [
            {
              t: "विकास के लिए सुरक्षित, बिना निर्णय वाला स्थान",
              d:
                "हम एक गर्मजोशी भरा, बिना निर्णय वाला और भावनात्मक रूप से सुरक्षित वातावरण बनाते हैं, जहां आप अपनी गति से विचारों, भावनाओं और अनुभवों को समझ सकें।",
            },
            {
              t: "योग्य और सहयोगी देखभाल",
              d:
                "हमारी टीम क्लिनिकल साइकोलॉजी, काउंसलिंग, विशेष शिक्षा और कम्युनिटी मेडिसिन के दृष्टिकोण साथ लाती है।",
            },
            {
              t: "करुणामय और क्लाइंट-केंद्रित दृष्टिकोण",
              d:
                "सहयोग सबसे अच्छा तब काम करता है जब व्यक्ति सच में सुना, समझा और सम्मानित महसूस करे। हम प्रक्रिया को सहयोगी रखते हैं।",
            },
            {
              t: "विविध मानसिक स्वास्थ्य चिंताओं का अनुभव",
              d:
                "हम बच्चों, किशोरों और वयस्कों को चिंता, अवसाद, ट्रॉमा, OCD, भावनात्मक कठिनाइयों, शैक्षिक चुनौतियों और पारिवारिक तनाव में सहयोग देते हैं।",
            },
            {
              t: "लचीला और सुलभ सहयोग",
              d:
                "ऑनलाइन और ऑफलाइन परामर्श विकल्प सहयोग को आपकी जरूरतों के अनुसार अधिक सुलभ, आरामदायक और सुविधाजनक बनाते हैं।",
            },
          ],
        },
        support: {
          eyebrow: "सहयोग के क्षेत्र",
          heading: "मानसिक स्वास्थ्य, काउंसलिंग और लर्निंग सपोर्ट।",
          body:
            "बच्चों, किशोरों और वयस्कों के साथ काम - हर व्यक्ति को उसके अपने स्थान से समझते हुए, उसकी अनूठी कहानी के अनुसार देखभाल।",
        },
        cta: {
          eyebrow: "आप महत्वपूर्ण हैं। आपकी बात सुनी जाती है।",
          heading: "आइए आपको फिर से अपनी जिंदगी का लेखक बनाएं।",
          button: "प्रारंभिक परामर्श बुक करें",
        },
      },
      about: {
        metaTitle: "ManoNirmaan टीम के बारे में - ManoNirmaan",
        metaDescription:
          "ManoNirmaan टीम से मिलें, जो क्लिनिकल साइकोलॉजी, काउंसलिंग, विशेष शिक्षा और कम्युनिटी मेडिसिन सहयोग देती है।",
        ogTitle: "ManoNirmaan टीम के बारे में - ManoNirmaan",
        ogDescription: "मानसिक स्वास्थ्य, लर्निंग और accessible care के लिए बहु-विषयक टीम।",
        eyebrow: "हमारी टीम के बारे में",
        heading: "ManoNirmaan सहयोगी देखभाल पर आधारित है।",
        paragraphs: [
          "ManoNirmaan एक टीम-ओरिएंटेड मानसिक स्वास्थ्य और लर्निंग सपोर्ट स्पेस है, जहां कठिन बातें अकेले उठानी नहीं पड़तीं।",
          "हमारी पांच सदस्यीय टीम क्लिनिकल साइकोलॉजी, काउंसलिंग साइकोलॉजी, hearing impairment के लिए विशेष शिक्षा, educational guidance और community medicine को साथ लाती है।",
          "यह सहयोगी मॉडल व्यक्ति को संपूर्ण रूप से देखता है - भावनाएं, रिश्ते, सीखने की जरूरतें, accessibility, परिवार, शरीर का स्वास्थ्य और community wellbeing।",
          "हम बच्चों, किशोरों, वयस्कों और परिवारों के साथ सुरक्षित, करुणामय और बिना निर्णय वाली प्रक्रिया में काम करते हैं।",
          "साथ मिलकर हम healing, emotional growth, self-understanding, accessible learning और अंदरूनी मजबूती के लिए care space बनाते हैं।",
        ],
        strengths: {
          items: [
            {
              t: "क्लिनिकल care",
              d: "Assessment, therapy और emotional wellbeing के लिए RCI licensed और registered clinical psychology support.",
            },
            {
              t: "काउंसलिंग support",
              d: "Students, families और life challenges से गुजर रहे लोगों के लिए education और counselling psychology guidance.",
            },
            {
              t: "Accessible learning",
              d: "Hearing impairment वाले learners के लिए inclusive pathways बनाने वाला special education support.",
            },
            {
              t: "Whole-person health",
              d: "Body health, context और support systems को ध्यान में रखने वाली community medicine insight.",
            },
          ],
        },
        mano: {
          eyebrow: "ManoNirmaan के बारे में",
          mind: "मन",
          reconstruction: "पुनर्निर्माण",
          body:
            "ManoNirmaan करुणा, evidence-informed care, accessible learning support और steady presence के माध्यम से भीतर के स्व का सौम्य पुनर्निर्माण है।",
        },
        teamEyebrow: "टीम से मिलें",
        teamHeading:
          "मानसिक स्वास्थ्य, learning, accessibility और community wellbeing में सहयोग देने वाले पांच सदस्य।",
        values: {
          visionTitle: "हमारा विजन",
          vision:
            "हमारे दरवाजे से आने वाला हर व्यक्ति सुना हुआ महसूस करे और व्यक्तिगत देखभाल पाए। हम हर किसी पर एक ही तरीका लागू करने के लिए नहीं हैं। आप महत्वपूर्ण हैं। आपकी बात सुनी जाती है।",
          missionTitle: "हमारा मिशन",
          mission:
            "हर व्यक्ति के लिए - उम्र और जीवन के चरण से परे - एक सुरक्षित, बिना निर्णय वाला, गोपनीय और पूर्ण रूप से सहयोगी स्थान बनना, और अधिक समावेशी व देखभालपूर्ण समुदाय में योगदान देना।",
          valuesTitle: "हमारे मूल्य",
          items: ["ईमानदारी", "सम्मान", "निष्ठा", "कर्तव्यनिष्ठा"],
        },
      },
      services: {
        metaTitle: "सेवाएं और थेरेपी - ManoNirmaan",
        metaDescription:
          "CBT, DBT, ACT, पर्सन-सेंटर्ड थेरेपी, माइंडफुलनेस, कपल और फैमिली थेरेपी। ऑनलाइन और व्यक्तिगत रूप से उपलब्ध क्लिनिकल सेवाएं।",
        ogTitle: "सेवाएं और थेरेपी - ManoNirmaan",
        ogDescription: "आपके लिए सोच-समझकर अनुकूलित थेरेपी।",
        eyebrow: "हम क्या प्रदान करते हैं",
        titleBefore: "थेरेपी जो सोच-समझकर",
        titleEmphasis: "आपके अनुसार",
        titleAfter: "अनुकूलित हो।",
        intro:
          "गर्मजोशी, गोपनीयता और प्रमाण-आधारित देखभाल के उच्च मानकों के साथ दी जाने वाली क्लिनिकल सेवाओं की चुनी हुई श्रृंखला।",
        modalities: [
          {
            t: "इंटीग्रेटिव काउंसलिंग",
            d: "कई प्रमाण-आधारित तरीकों से ली गई, आपके अनुसार अनुकूलित देखभाल।",
          },
          {
            t: "कॉग्निटिव बिहेवियरल थेरेपी (CBT)",
            d: "उन विचार पैटर्न को नए ढंग से देखना जो आपकी भावनाओं और व्यवहार को आकार देते हैं।",
          },
          {
            t: "डायलेक्टिकल बिहेवियर थेरेपी (DBT)",
            d: "भावनात्मक नियंत्रण, तनाव सहनशीलता और माइंडफुलनेस के कौशल।",
          },
          {
            t: "एक्सेप्टेंस एंड कमिटमेंट थेरेपी (ACT)",
            d: "कठिन भावनाओं के लिए जगह बनाते हुए मूल्यों के अनुसार जीवन जीना।",
          },
          {
            t: "बिहेवियर मॉडिफिकेशन",
            d: "व्यवहारिक बदलाव और आदत निर्माण के लिए संरचित तरीके।",
          },
          {
            t: "पर्सन-सेंटर्ड थेरेपी",
            d: "सहानुभूति, प्रामाणिकता और बिना शर्त सम्मान पर आधारित संबंधपरक स्थान।",
          },
          {
            t: "माइंडफुलनेस-बेस्ड थेरेपी",
            d: "हीलिंग की नींव के रूप में वर्तमान क्षण की जागरूकता विकसित करना।",
          },
          {
            t: "कपल थेरेपी",
            d: "संचार, निकटता और संबंध को साथ मिलकर सुधारना।",
          },
          {
            t: "फैमिली थेरेपी",
            d: "हर सदस्य की भलाई के लिए परिवार प्रणाली के साथ काम करना।",
          },
        ],
        concernsEyebrow: "जिन चिंताओं में हम सहयोग करते हैं",
        concernsHeading: "मानसिक स्वास्थ्य चिंताओं की विस्तृत श्रृंखला।",
        pricingEyebrow: "शुल्क",
        pricingHeading: "ऑनलाइन और व्यक्तिगत सेशन उपलब्ध।",
        pricingBody: "प्रारंभिक परामर्श के बाद शुल्क स्पष्ट रूप से साझा किए जाते हैं।",
      },
      approach: {
        metaTitle: "हमारा care approach - ManoNirmaan",
        metaDescription:
          "थेरेपी का संबंधपरक, इंटीग्रेटिव दृष्टिकोण - उन शक्तियों को पहचानना और पोषित करना जो आपको यहां तक लाई हैं। प्रारंभिक आकलन, सेशन आवृत्ति और नियमित समीक्षा।",
        ogTitle: "हमारा care approach - ManoNirmaan",
        ogDescription: "संबंधपरक, इंटीग्रेटिव, प्रमाण-आधारित मनोचिकित्सा।",
        eyebrow: "हमारा care approach",
        titleBefore: "यह आपको",
        titleEmphasis: "ठीक करने",
        titleAfter: "के बारे में नहीं - बल्कि आपकी उन शक्तियों को पोषित करने के बारे में है जो आपको यहां तक लाई हैं।",
        p1:
          "ManoNirmaan में support उन शक्तियों को पहचानने, सम्मान देने और धीरे-धीरे पोषित करने के बारे में है जो आपको इस बिंदु तक लाई हैं। हम relational, collaborative और integrative approach से काम करते हैं।",
        relationalLabel: "संबंधपरक दृष्टिकोण",
        relationalText:
          " का अर्थ है कि हम हर व्यक्ति की अनूठी जरूरतों के अनुसार support को अनुकूलित करते हैं, साथ ही healing और self-growth के लिए करुणामय, सहयोगी और बिना निर्णय वाला स्थान बनाते हैं।",
        integrativeLabel: "एक integrative team के रूप में",
        integrativeText:
          ", हम therapeutic, counselling, educational और health perspectives को आपकी जरूरतों, अनुभवों और लक्ष्यों के अनुसार अनुकूलित करते हैं।",
        expectHeading: "प्रारंभिक परामर्श के बाद क्या अपेक्षा करें",
        steps: [
          {
            n: "01",
            t: "प्रारंभिक आकलन",
            d:
              "पहले कुछ सेशन आपकी जरूरतों, लक्ष्यों और best support pathway को समझने की assessment period होंगे। यह एक collaborative process है।",
          },
          {
            n: "02",
            t: "सेशन की आवृत्ति",
            d:
              "सेशन की कोई fixed संख्या नहीं होती - support individualized होता है। कई मुद्दे हों तो हम एक समय में एक area पर focus कर सकते हैं। Frequency साथ तय की जाती है; weekly sessions अक्सर momentum बनाए रखते हैं।",
          },
          {
            n: "03",
            t: "नियमित समीक्षा",
            d:
              "हम आपकी progress नियमित रूप से देखते हैं ताकि support आपके goals के अनुरूप रहे। हर 6-8 sessions पर review focus adjust करने और feedback शामिल करने में मदद करता है।",
          },
        ],
      },
      contact: {
        metaTitle: "संपर्क - ManoNirmaan",
        metaDescription:
          "वाराणसी में ManoNirmaan से संपर्क करें। ईमेल manonirmaan@gmail.com या कॉल 919196421388।",
        ogTitle: "संपर्क - ManoNirmaan",
        ogDescription: "मन के लिए एक शांत स्थान। संपर्क करें।",
        eyebrow: "हमसे संपर्क करें",
        titleBefore: "एक शांत स्थान,",
        titleEmphasis: "बस एक संदेश दूर",
        titleAfter: "।",
        visit: "पता",
        email: "ईमेल",
        phone: "फोन",
        responseEyebrow: "उत्तर देने के समय पर नोट",
        responseBefore:
          "संदेशों का उत्तर सोमवार से शनिवार 24-48 घंटों के भीतर दिया जाता है। यदि यह मानसिक स्वास्थ्य आपातकाल है, तो कृपया अपने नजदीकी अस्पताल से संपर्क करें। क्लिनिक से जुड़ने के लिए कॉल करें:",
      },
      booking: {
        metaTitle: "सेशन बुक करें - ManoNirmaan",
        metaDescription:
          "ManoNirmaan टीम के साथ प्रारंभिक परामर्श या सपोर्ट सेशन बुक करें। वाराणसी में ऑनलाइन और व्यक्तिगत सेशन उपलब्ध।",
        ogTitle: "सेशन बुक करें - ManoNirmaan",
        ogDescription: "60 मिनट के थेरेपी सेशन, ऑनलाइन और व्यक्तिगत।",
        eyebrow: "थेरेपी सेशन बुक करें",
        titleBefore: "पहला कदम उठाएं -",
        titleEmphasis: "धीरे से",
        titleAfter: "।",
        intro:
          "यह सुनिश्चित करने के लिए कि हमारे काम के लिए सुरक्षित आधार बन चुका है, कृपया पूर्ण थेरेपी सेशन तभी बुक करें जब आपका प्रारंभिक परामर्श पूरा हो चुका हो और आगे साथ काम करने पर सहमति बन चुकी हो।",
        card: {
          eyebrow: "प्रारंभिक परामर्श",
          title: "60 मिनट का प्रारंभिक परामर्श",
          subtitle: "ManoNirmaan care team के साथ",
          duration: "60 मिनट",
          frequency: "साप्ताहिक या पखवाड़े में",
          online: "सुरक्षित वीडियो के माध्यम से ऑनलाइन",
          videoPlatforms: "Zoom, Google Meet, Microsoft Teams और अन्य",
          offline: "या वाराणसी में व्यक्तिगत",
          note:
            "आपका अनुरोध भेजने के बाद, टीम 24-48 घंटों के भीतर समय की पुष्टि और अगले चरण साझा करने के लिए संपर्क करेगी।",
        },
        success: {
          title: "धन्यवाद।",
          body:
            "आपका अनुरोध प्राप्त हो गया है। ManoNirmaan टीम 24-48 घंटों के भीतर संपर्क करेगी।",
        },
        form: {
          title: "प्रारंभिक परामर्श का अनुरोध करें",
          name: "पूरा नाम",
          age: "आयु",
          email: "ईमेल",
          phone: "फोन",
          sessionType: "सेशन का प्रकार",
          online: "ऑनलाइन",
          offline: "व्यक्तिगत, वाराणसी",
          videoCallPreference: "पसंदीदा वीडियो कॉल प्लेटफ़ॉर्म",
          videoCallHint: "ऑनलाइन परामर्श के लिए आप किस माध्यम से जुड़ना चाहेंगे, चुनें।",
          videoCallOptions: {
            zoom: "Zoom",
            google_meet: "Google Meet",
            microsoft_teams: "Microsoft Teams",
            no_preference: "कोई पसंद नहीं",
          },
          date: "पसंदीदा तारीख",
          time: "पसंदीदा समय",
          languagePreference: "सेशन की पसंदीदा भाषा",
          languageOptions: {
            english: "English",
            hindi: "हिन्दी",
            either: "कोई भी चलेगी",
          },
          referralSource: "आपको हमारे बारे में कैसे पता चला?",
          referralOptions: {
            none: "एक विकल्प चुनें",
            facebook: "Facebook",
            instagram: "Instagram",
            whatsapp: "WhatsApp",
            friend: "मित्र",
            patient: "किसी patient के माध्यम से",
            other: "अन्य",
          },
          referralDetails: "रेफरल विवरण",
          referralDetailsPlaceholder: "नाम, पेज, ग्रुप या कोई अतिरिक्त जानकारी यदि आप साझा करना चाहें।",
          notes: "आप किस वजह से आना चाहते हैं?",
          notesPlaceholder: "यदि आप चाहें तो थोड़ा साझा करें - केवल उतना ही जितना सहज लगे।",
          submit: "अनुरोध भेजें",
          submitting: "भेजा जा रहा है...",
          orEmail: "या ईमेल करें",
          newToTherapy: "थेरेपी में नए हैं?",
          errorFallback: "कृपया फॉर्म जांचें और फिर कोशिश करें।",
          submitFailure:
            "आपका अनुरोध सबमिट नहीं हो सका। कृपया फिर कोशिश करें या {{email}} पर ईमेल करें।",
        },
        validation: {
          name: "कृपया अपना पूरा नाम दर्ज करें।",
          email: "कृपया सही ईमेल पता दर्ज करें।",
          age: "कृपया सही आयु दर्ज करें।",
          notes: "नोट्स 2000 अक्षरों या उससे कम होने चाहिए।",
          referralDetails: "रेफरल विवरण 200 अक्षरों या उससे कम होना चाहिए।",
          videoCallPreference: "कृपया पसंदीदा वीडियो कॉल प्लेटफ़ॉर्म चुनें।",
        },
      },
      doctor: {
        login: {
          metaTitle: "डॉक्टर लॉगिन - ManoNirmaan",
          eyebrow: "डॉक्टर एक्सेस",
          title: "डॉक्टर लॉगिन",
          body: "वेबसाइट के माध्यम से भेजे गए सेशन requests देखने के लिए साइन इन करें।",
          username: "यूजरनेम",
          password: "पासवर्ड",
          submit: "लॉगिन",
          submitting: "जांच हो रही है...",
          invalid: "डॉक्टर credentials सही नहीं हैं।",
          authenticated: "आप पहले से लॉगिन हैं।",
          openDashboard: "सेशन details खोलें",
          securityNote: "यह पेज केवल clinic use के लिए है।",
        },
        dashboard: {
          metaTitle: "सेशन Details - ManoNirmaan",
          eyebrow: "डॉक्टर डैशबोर्ड",
          title: "सेशन requests",
          body: "वेबसाइट के माध्यम से भेजे गए booking requests देखें।",
          refresh: "Refresh",
          logout: "Logout",
          total: "{{count}} request",
          total_plural: "{{count}} requests",
          empty: "कोई सेशन request नहीं मिली।",
          loading: "सेशन requests लोड हो रही हैं...",
          error: "Booking data लोड नहीं हो सका।",
          errorRpcMissing: "Supabase में doctor read function नहीं मिला।",
          errorMissingEnv: ".env में DOCTOR_DASHBOARD_SECRET missing है।",
          errorRpcHint:
            "Supabase SQL Editor में supabase/migrations/20260523120000_doctor_bookings_rpc.sql और 20260523130000_doctor_booking_mutations.sql चलाएँ, फिर npm run dev restart करें।",
          errorEnvHint: ".env में DOCTOR_DASHBOARD_SECRET=ManoNirmaan-Doctor-Read-2026 जोड़ें।",
          errorLoginHint: "Logout करें, /doctor-login से login करें, फिर यहाँ वापस आएँ।",
          loginRequired: "डॉक्टर लॉगिन जरूरी है।",
          goToLogin: "डॉक्टर लॉगिन पर जाएं",
          patient: "Patient",
          contact: "Contact",
          session: "Session",
          preferredSlot: "Preferred slot",
          requestDetails: "Request details",
          status: "Status",
          received: "Received",
          age: "Age",
          phone: "Phone",
          email: "Email",
          type: "Type",
          date: "Date",
          time: "Time",
          notes: "Notes",
          notProvided: "Not provided",
          videoCall: "वीडियो कॉल प्लेटफ़ॉर्म",
          statusPending: "Pending",
          statusConfirmed: "Confirmed",
          statusCancelled: "Cancelled",
          delete: "Delete request",
          deleting: "Deleting...",
          deleteConfirm: "इस session request को permanently delete करें? यह वापस नहीं होगा।",
          actionFailed: "Request update नहीं हो सका। Supabase में latest SQL चलाएँ, फिर try करें।",
        },
      },
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
