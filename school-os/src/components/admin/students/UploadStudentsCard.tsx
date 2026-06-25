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
import { showSuccess } from "../../../utils/toast";
import Loader from "../../common/Loader";

const UploadStudentsCard = ({
  onSuccess,
}: {
  onSuccess: () => Promise<void>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showNote, setShowNote] = useState(true);

  type Student = {
    AdmissionNo: number;
    Name: string;
    Class: number;
    Section: string;
    RollNo: number;
    FatherName: string;
    MotherName: string;
    Mobile: number;
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

      const jsonData: Student[] = XLSX.utils.sheet_to_json(workSheet);
      console.log("jsonData: ", jsonData);

      const isValid = validateStudents(jsonData);
      if (!isValid) return;
      setFileName(sheetName);
      setShowNote(false);
      setStudents(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const validateStudents = (students: Student[]) => {
    const nextErrors: string[] = [];

    students.forEach((student, index) => {
      if (!student.Name?.trim()) {
        nextErrors.push(`Row ${index + 2}: Name is Required`);
      }
      if (!student.Class) {
        nextErrors.push(`Row ${index + 2}: Class is Required`);
      }
      if (!student.RollNo) {
        nextErrors.push(`Row ${index + 2}: Roll No is Required`);
      }
      if (!student.Section?.trim()) {
        nextErrors.push(`Row ${index + 2}: Section is Required`);
      }
      if (!student.AdmissionNo) {
        nextErrors.push(`Row ${index + 2}: Admission No is Required`);
      }
    });

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleUpload = async () => {
    if (!students) return;

    setIsUploading(true);

    try {
      console.log(students);

      await api.post("/api/students/bulk-import", students);
      onSuccess();
      showSuccess("Bulk students created successfully");
      setShowNote(true);
      setFileName("");
      setStudents([]);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setIsUploading(false);
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
            Bulk Student Upload
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
                `${import.meta.env.VITE_API_URL}/students/download-template`,
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
              Admission Number, Name, Class, Section, Roll No, Father Name,
              Mobile Number
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
          <div className="flex gap-3 flex-col">
            <div className="flex gap-3 items-center">
              <CircleX size={20} className="text-error" />{" "}
              <p
                className="
              font-medium
              text-textPrimary
            "
              >
                Need Corrections
              </p>
            </div>
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
            "Import Students"
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
                  <th className="p-3 text-left">Admission No</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Roll</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3">{student.AdmissionNo}</td>
                    <td className="p-3">{student.Name}</td>
                    <td className="p-3">
                      {student.Class}
                      {student.Section}
                    </td>
                    <td className="p-3">{student.RollNo}</td>
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

export default UploadStudentsCard;
