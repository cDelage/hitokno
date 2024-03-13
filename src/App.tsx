import GlobalStyle from "./GlobalStyle";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import {
  FileHitokno,
  FileDetail,
  FileRename,
  Folder,
  MoveFile,
  RenameFolderParams,
} from "./types/Repository.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FileDisabled from "./features/home/FileDisabled";
import FileSelected from "./features/home/FileSelected";
import Cartography from "./pages/Cartography";
import { SheetDetail } from "./types/Cartography.type";
import Test from "./pages/Test";
import {
  CreateTestProps,
  SearchByCriteriaResult,
  TestType,
} from "./types/Test.type";
import { SearchCriterias } from "./types/SearchCriteria.type";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router, Route } from "electron-router-dom";
import { SaveParams } from "./types/Save.type";

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
      createFile: (folderId: string) => Promise<FileHitokno | null>;
      removeFolder: (folderId: string) => Promise<string>;
      renameFolder: (params: RenameFolderParams) => Promise<Folder>;
      findFile: (fileId: string) => Promise<FileDetail | undefined>;
      renameFile: (params: FileRename) => Promise<Folder>;
      updateCartography: (file: FileHitokno) => Promise<number>;
      updateDeck: (file: FileHitokno) => Promise<number>;
      findSheet: (sheetId: string) => Promise<SheetDetail>;
      removeFile: (params: { _id: string }) => Promise<number>;
      moveFile: (params: MoveFile) => Promise<void>;
      saveFile: (params: SaveParams) => Promise<void>;
      importFile: (fileId: string) => Promise<FileHitokno>
    };
    tests: {
      createTest: (params: CreateTestProps) => Promise<TestType>;
      findTests: () => Promise<TestType[]>;
      findTestById: ({ _id }: { _id: string }) => Promise<TestType>;
      updateTest: ({ test }: { test: TestType }) => Promise<number>;
      deleteTest: ({ _id }: { _id: string }) => Promise<number>;
      findTestByCriterias: (
        criterias: SearchCriterias
      ) => Promise<SearchByCriteriaResult>;
    };
  }
}

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
      <Router
        main={
          <Route
            element={<AppLayout />}
            path={"/"}
            children={
              <>
                <Route
                  path="/explorer"
                  element={<Home />}
                  children={
                    <>
                      <Route
                        path="/explorer"
                        element={<FileDisabled />}
                        index={true}
                      />
                      <Route
                        path="/explorer/file/:fileId"
                        element={<FileSelected />}
                        index={true}
                      />
                      <Route
                        path="/explorer/folder/:folderId"
                        element={<FileDisabled />}
                      />
                    </>
                  }
                />
                <Route path="/cartography/:fileId" element={<Cartography />} />
                <Route path="/test/:testId" element={<Test />} />
              </>
            }
          />
        }
      />
    </QueryClientProvider>
  );
}

export default App;
