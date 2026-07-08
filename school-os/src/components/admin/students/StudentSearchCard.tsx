import { Search, User } from "lucide-react";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import Button from "../../ui/Button";
import api from "../../../api/api";
import { showWarning } from "../../../utils/toast";
import Loader from "../../ui/Loader";
import { inputClass } from "../../../styles/forms";


const StudentSearchCard = () => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [className, setClassName] = useState("");
  const [isSectionRequired, setIsSectionRequired] = useState(false);
  const [isClassRequired, setIsClassRequired] = useState(false);
  const [formData, setFormData] = useState("");
  const [students, setStudents] = useState<Array<Student>>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  type Student = {
    name: string;
    classId: { name: number; section: string };
    admissionNo: number;
  };

  type FormDataType = {
    name: string;
    className: string;
    section: string;
    admissionNo: string;
  };

  const handleSearch: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!className && !section && !admissionNo) {
      setFormData("Please fill any field");
      return;
    }

    const data: FormDataType = { name, className, section, admissionNo };

    try {
      setLoading(true);
      setHasSearched(true);
      console.log("hasSearched: ", hasSearched);
      const res = await api.post("/api/students/search", data);
      if (res.data.data) {
        if (res.data.data.length > 0) {
          setStudents(res.data.data);
        } else {
          showWarning("No student found!");
          // setNoStudent(true);
        }
      } else {
        setStudents([]);
      }
      setClassName("");
      setSection("");
      setAdmissionNo("");
      setIsClassRequired(false);
      setIsSectionRequired(false);
    } catch (error) {
      console.log("error in fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setClassName(e.target.value.trim());
    !e.target.value ? setIsSectionRequired(false) : setIsSectionRequired(true);
    setFormData("");
  };
  const handleSectionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSection(e.target.value.toUpperCase().trim());
    !e.target.value ? setIsClassRequired(false) : setIsClassRequired(true);
    setFormData("");
  };
  const handleAdmissionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAdmissionNo(e.target.value.trim());
    if (e.target.value) setFormData("");
  };
  return (
    <section
      className="
        p-4
        bg-surface
        rounded-2xl border border-border
        shadow-card
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
     <div
        className="
          flex
          items-center gap-3
        "
      >
        <div
          className="
            flex
            h-12 w-12
            bg-primaryLight
            rounded-xl
            items-center justify-center
          "
        >
          <Search
            size={22}
            className="
              text-primary
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Search Student
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Find student details
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSearch}>
        <div
          className="
            mt-5 space-y-4
            sm:mt-6
          "
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
            placeholder="Student Name"
          className={`${inputClass} bg-slate-400/10`}
          />

          <div
            className="
              grid grid-cols-2
              gap-4
            "
          >
            <input
              type="number"
              value={className}
              onChange={handleClassChange}
              required={isClassRequired}
              placeholder="Class"
             className={inputClass}
            />

            <input
              type="text"
              value={section}
              onChange={handleSectionChange}
              required={isSectionRequired}
              placeholder="Section"
             className={inputClass}
            />
          </div>

          <input
            type="number"
            value={admissionNo}
            onChange={handleAdmissionChange}
            placeholder="Admission Number"
            className={inputClass}
          />
          {formData && (
            <p
              className="
                ml-1
                text-xs text-red-500
                sm:text-sm
              "
            >
              {formData}
            </p>
          )}
          <Button
            disabled={loading}
            className="
              w-full
            "
          >
            {loading ? <Loader /> : "Find Students"}
          </Button>
        </div>
      </form>

      {/* {loading && (
        <div
          className="
            flex
            mt-6
            text-sm text-textSecondary
            items-center justify-center gap-3
          "
        >
          <div
            className="
              h-5 w-5
              rounded-full border-2 border-primary border-t-transparent
              animate-spin
            "
          />

          <span>Loading...</span>
        </div>
      )} */}

      {/* Result */}
      <div>
        {students.length > 0
          ? students?.map((student) => (
              <div
                className="
                  mt-6 p-4
                  bg-background
                  rounded-xl border border-border
                  cursor-pointer transition-all
                  duration-300 hover:border-primary/40 hover:bg-primaryLight/20
                "
              >
                <div
                  className="
                    flex
                    items-center gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10 w-10
                      bg-primaryLight
                      rounded-full
                      shrink-0 items-center justify-center
                    "
                  >
                    <User
                      size={18}
                      className="
                        text-primary
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold text-textPrimary text-sm
                        sm:text-base
                      "
                    >
                      {student?.name}
                    </h3>

                    <p
                      className="
                        text-sm text-textSecondary
                      "
                    >
                      Class {student?.classId.name}
                      {student?.classId.section}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-4
                    text-xs text-textSecondary
                    sm:text-sm
                  "
                >
                  Admission No:{" "}
                  <span
                    className="
                      font-medium text-textPrimary
                    "
                  >
                    {student?.admissionNo}
                  </span>
                </div>
              </div>
            ))
          : hasSearched && (
              <div
                className="
                  flex
                  mt-6
                  text-sm text-textSecondary
                  items-center justify-center
                "
              >
                <span>No student found. Try a different search.</span>
              </div>
            )}
      </div>
    </section>
  );
};

export default StudentSearchCard;
