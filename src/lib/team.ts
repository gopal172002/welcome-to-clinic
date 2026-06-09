import devyaniImage from "@/assets/devyani.jpg";
import pathanImage from "@/assets/Pathan.png";
import priyaImage from "@/assets/Priya.png";
import raviImage from "@/assets/Ravi.png";
import shubhamImage from "@/assets/Shubham.png";

export type TeamMember = {
  name: string;
  title: string;
  focus: string;
  quote: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Devyani Barodh",
    title: "Assistant Professor & RCI Registered Clinical Psychologist",
    focus: "Psychotherapy, psychological assessment, crisis support and psychoeducation.",
    quote:
      "Healing is not about fixing yourself — it is about reconnecting with the parts of you that were unheard.",
    image: devyaniImage,
  },
  {
    name: "Ms. Priya Sultania",
    title: "RCI Licensed Clinical Psychologist",
    focus: "Clinical psychology support for emotional wellbeing, growth and self-understanding.",
    quote:
      "Some things are too heavy to carry alone — and too important to keep burying. This is a space where you don't have to do either.",
    image: priyaImage,
  },
  {
    name: "Dr. Ravi Patidar",
    title: "MBBS, MD",
    focus: "Community medicine, public health perspective and whole-person support.",
    quote: "Medicine heals the body; understanding and support help heal the mind.",
    image: raviImage,
  },
  {
    name: "Pathan Tofikkhan Anvarkhan",
    title: "Assistant Professor & Special Educator (Hearing Impairment)",
    focus: "Inclusive education, hearing impairment support and accessible learning pathways.",
    quote: "Together, we create accessible pathways to learning and success.",
    image: pathanImage,
  },
  {
    name: "Shubham Dhakad",
    title: "Education & Counselling Psychologist",
    focus: "Educational guidance, counselling support and student development.",
    quote: "Guiding minds, shaping futures, and empowering lives.",
    image: shubhamImage,
  },
];
