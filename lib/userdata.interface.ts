// export interface UserData {
//   userId: string; // ObjectId will be string when used in frontend
//   publicIdentifier: string;
//   profileFsd?: string;
//   identifier?: string;
//   image?: string;
//   firstName?: string;
//   lastName?: string;
//   headline?: string;
//   industry?: string;
//   industryUrn?: string;
//   summary?: string;
//   followers?: number;
//   connections?: number;
//   location?: {
//     countryCode?: string;
//     address?: string;
//   };
//   jobExperience?: Array<{
//     company?: {
//       name?: string;
//       identifier?: string;
//       liUrl?: string;
//       imageUrl?: string;
//     };
//     employmentType?: string;
//     positions?: Array<{
//       function?: string;
//       location?: string;
//       tenure?: {
//         start?: {
//           month?: number;
//           year?: number;
//         };
//         end?: {
//           month?: number;
//           year?: number;
//         };
//       };
//       description?: string;
//       skills?: string[];
//     }>;
//   }>;
//   education?: Array<{
//     tenure?: {
//       start?: {
//         month?: number;
//         year?: number;
//       };
//       end?: {
//         month?: number;
//         year?: number;
//       };
//     };
//     subject?: string;
//     courseDescription?: string;
//     company?: {
//       name?: string;
//       identifier?: string;
//       liUrl?: string;
//       imageUrl?: string;
//     };
//   }>;
//   languages?: Array<{
//     proficiency?: string;
//     language?: string;
//   }>;
//   skills?: string[];
//   createdAt?: string; // Date will be string when received from API
//   updatedAt?: string; // Date will be string when received from API
// }

export interface UserData {
  firstName?: string;
  lastName?: string;
  headline?: string;
  industry?: string;
  location?: {
    address?: string;
    countryCode?: string;
  };
  connections?: number;
  followers?: number;
  image?: string;
  summary?: string;
  jobExperience?: JobExperience[];
  education?: Education[];
  skills?: string[];
  languages?: Language[];
  updatedAt?: string;
}

interface JobExperience {
  company?: {
    name?: string;
    imageUrl?: string;
  };
  employmentType?: string;
  positions?: Position[];
}

interface Position {
  function?: string;
  tenure?: {
    start?: {
      month?: string;
      year?: string;
    };
    end?: {
      month?: string;
      year?: string;
    };
  };
  location?: string;
  description?: string;
  skills?: string[];
}

interface Education {
  company?: {
    name?: string;
    imageUrl?: string;
  };
  subject?: string;
  tenure?: {
    start?: {
      year?: string;
    };
    end?: {
      year?: string;
    };
  };
  courseDescription?: string;
}

interface Language {
  language?: string;
  proficiency?: string;
}
