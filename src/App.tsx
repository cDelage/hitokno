import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Dummy from "./pages/Dummy";
import {
  File,
  FileDetail,
  FileRename,
  Folder,
  RenameFolderParams,
} from "./types/Repository.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FileDisabled from "./features/home/FileDisabled";
import FileSelected from "./features/home/FileSelected";
import Cartography from "./pages/Cartography";
import { SheetDetail } from "./types/Cartography.type";

/**
 * When i add it into a file .d.ts, then typescript not recognize the interface.
 */
declare global {
  interface Window {
    windowManagement: {
      isMaximized: () => boolean;
      maximize: () => void;
      unmaximize: () => void;
      minimize: () => void;
      close: () => void;
    };
    repository: {
      createFolder: () => Promise<Folder | null>;
      findRepository: () => Promise<Folder[] | null>;
      createFile: (folderId: string) => Promise<File | null>;
      removeFolder: (folderId: string) => Promise<string>;
      renameFolder: (params: RenameFolderParams) => Promise<Folder>;
      findFile: (fileId: string) => Promise<FileDetail | undefined>;
      renameFile: (params: FileRename) => Promise<Folder>;
      updateCartography: (file: File) => Promise<number>;
      updateDeck: (file: File) => Promise<number>;
      findSheet : (sheetId : string) => Promise<SheetDetail>;
    };
  }
}


const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        path: "/explorer",
        element: <Home />,
        children: [
          {
            path: "/explorer",
            element: <FileDisabled />,
            index: true,
          },
          {
            path: "/explorer/file/:fileId",
            element: <FileSelected />,
          },
          {
            path: "/explorer/folder/:folderId",
            element: <FileDisabled />,
          },
        ],
      },
      {
        path: "/cartography/:fileId",
        element: <Cartography />,
      },
      {
        path: "/fake",
        element: <Dummy />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
