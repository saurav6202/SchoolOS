import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  CircleX,
  Import,
} from "lucide-react";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../common/Loader";

const UploadTeachersCard = ({
  onSuccess,
}: {
  onSuccess: () => Promise<void>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showNote, setShowNote] = useState(true);

  type Teacher = {
    Name: string;
    AssignedClass?: string;
    Subjects: string;
    Mobile: number;
    Email?: string;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];

      const jsonData: Teacher[] = XLSX.utils.sheet_to_json(workSheet);
      console.log("jsonData: ", jsonData);

      const isValid = validateStudents(jsonData);
      if (!isValid) return;
      setFileName(sheetName);
      setShowNote(false);
      setTeachers(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const validateStudents = (teachers: Teacher[]) => {
    const nextErrors: string[] = [];

    teachers.forEach((teacher, index) => {
      if (!teacher.Name?.trim()) {
        nextErrors.push(`Row ${index + 2}: Name is Required`);
      }
      if (!teacher.Subjects?.trim()) {
        nextErrors.push(`Row ${index + 2}: Subjects is Required`);
      }
      if (!teacher.Mobile) {
        nextErrors.push(`Row ${index + 2}: Mobile No is Required`);
      }
    });

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleUpload = async () => {
    if (!teachers) return;

    setIsUploading(true);

    try {
      console.log(teachers);

      const res = await api.post("/api/teachers/bulk-import", teachers);
      showSuccess(res.data.message);
      setShowNote(true);
      setFileName("");
      setTeachers([]);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error: any) {
      showError(error.response.data.message);
    } finally {
      setIsUploading(false);
      onSuccess();
    }
  };

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        shadow-card
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primaryLight
          "
        >
          <Upload size={22} className="text-primary" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Bulk Teacher Upload
          </h2>

          <p
            className="
              text-sm
              text-textSecondary
            "
          >
            Import hundreds of students using Excel
          </p>
        </div>
      </div>

      {/* TEMPLATE */}
      <div
        className="
          mt-6
          rounded-xl
          border
          border-border
          bg-background
          p-4
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className="
                font-medium
                text-textPrimary
              "
            >
              Download Template
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-textSecondary
              "
            >
              Download the sample Excel template before uploading.
            </p>
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-border
              px-4
              py-2
              font-medium
              transition-all
              hover:bg-surface
            "
            onClick={() => {
              window.open(
                `${import.meta.env.VITE_API_URL}/teachers/download-template`,
              );
            }}
          >
            <Download size={18} />
            Template
          </button>
        </div>
      </div>

      {/* DROPZONE */}
      <div
        onClick={() => inputRef.current?.click()}
        className="
          mt-6
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          border-border
          bg-background
          p-10
          text-center
          transition-all
          hover:border-primary
          hover:bg-primaryLight/30
        "
      >
        <Upload
          size={40}
          className="
            mx-auto
            text-primary
          "
        />

        <h3
          className="
            mt-4
            font-semibold
            text-textPrimary
          "
        >
          Upload Student Excel File
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-textSecondary
          "
        >
          Drag & Drop or Click to Browse
        </p>

        <p
          className="
            mt-1
            text-xs
            text-textSecondary
          "
        >
          Supports .xlsx and .xls
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          hidden
        />
      </div>
      {/* IMPORTANT NOTE */}
      {showNote && (
        <div
          className="
          mt-6
          flex
          gap-3
          rounded-xl
          border
          border-warning/20
          bg-warning/5
          p-4
        "
        >
          <AlertCircle size={18} className="mt-0.5 text-warning" />

          <div>
            <p
              className="
              font-medium
              text-textPrimary
            "
            >
              Required Columns
            </p>

            <p
              className="
              mt-1
              text-sm
              text-textSecondary
            "
            >
              Name, AssignedClass(class-section: 1-A), Subjects, Mobile, Email
            </p>
          </div>
        </div>
      )}

      {errors.length > 0 ? (
        <div
          className="
            mt-6
            rounded-xl
            border
            border-success/20
            bg-error/5
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <CircleX size={20} className="text-error" />
            {errors.map((error) => (
              <div>
                {/* <p
                className="
                  font-medium
                  text-textPrimary
                "
              >
                {fileName}
              </p> */}

                <p
                  className="
                  text-sm
                  text-textSecondary
                "
                >
                  {error}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {fileName && (
            <div
              className="
            mt-6
            rounded-xl
            border
            border-success/20
            bg-success/5
            p-4
          "
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-success" />

                <div>
                  <p
                    className="
                  font-medium
                  text-textPrimary
                "
                  >
                    {fileName}
                  </p>

                  <p
                    className="
                  text-sm
                  text-textSecondary
                "
                  >
                    File selected successfully
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 
      {fileName && (
        <div
          className="
            mt-6
            rounded-xl
            border
            border-success/20
            bg-success/5
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-success" />

            <div>
              <p
                className="
                  font-medium
                  text-textPrimary
                "
              >
                {fileName}
              </p>

              <p
                className="
                  text-sm
                  text-textSecondary
                "
              >
                File selected successfully
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* ACTION */}
      <button
        disabled={!fileName || isUploading}
        onClick={handleUpload}
        className="
          mt-6
          w-full
          rounded-xl
          bg-primary
          py-3
          font-medium
          text-white
          transition-all
          hover:bg-primaryDark
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <span className="flex justify-center items-center gap-3">
          <Import size={18} />
          {isUploading ? (
            <>
              Importing... <Loader />
            </>
          ) : (
            "Import Teachers"
          )}
        </span>
      </button>

      {/* PREVIEW */}
      {fileName && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-primary" />

            <h3
              className="
                font-semibold
                text-textPrimary
              "
            >
              Preview Data
            </h3>
          </div>

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-border
            "
          >
            <table className="w-full">
              <thead>
                <tr className="bg-background">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">AssignedClass</th>
                  <th className="p-3 text-left">Subjects</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3">{teacher.Name}</td>
                    <td className="p-3">{teacher.AssignedClass ?? ""}</td>
                    <td className="p-3">{teacher.Subjects}</td>
                    <td className="p-3">{teacher.Mobile}</td>
                    <td className="p-3">{teacher.Email ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadTeachersCard;
