export interface Project {
  [x: string]: any;
  projectname: string;
  content: {
    title: string;
    technologies: string;
    description: string;
  };

  imageProject: string[];
  github: string;
  livetest: string;
}
