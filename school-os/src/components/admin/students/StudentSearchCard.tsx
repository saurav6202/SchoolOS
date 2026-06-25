import { Search, User } from "lucide-react";
import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import Button from "../../common/Button";
import api from "../../../api/api";
import { showWarning } from "../../../utils/toast";

const StudentSearchCard = () => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [className, setClassName] = useState("");
  const [isSectionRequired, setIsSectionRequired] = useState(false);
  const [isClassRequired, setIsClassRequired] = useState(false);
  const [formData, setFormData] = useState("");
  const [students, setStudents] = useState<Array<Student>>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [noStudnet, setNoStudent] = useState(false);

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
      const res = await api.post("/api/students/search", data);
      if (res.data.data) {
        if (res.data.data.length > 0) {
          setStudents(res.data.data);
          setShowResults(true);
        } else {
          showWarning("No student found!");
          // setNoStudent(true);
        }
      } else {
        setShowResults(false);
        setStudents([]);
        setFormData("No data found");
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
        p-6
        bg-surface
        rounded-2xl border border-border
        shadow-card
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
            mt-6 space-y-4
          "
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
            placeholder="Student Name"
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              transition-all
              outline-none focus:border-primary
            "
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
              className="
                px-4 py-3
                rounded-xl border border-border
                outline-none focus:border-primary
              "
            />

            <input
              type="text"
              value={section}
              onChange={handleSectionChange}
              required={isSectionRequired}
              placeholder="Section"
              className="
                px-4 py-3
                rounded-xl border border-border
                outline-none focus:border-primary
              "
            />
          </div>

          <input
            type="number"
            value={admissionNo}
            onChange={handleAdmissionChange}
            placeholder="Admission Number"
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              outline-none focus:border-primary
            "
          />
          {formData && (
            <p
              className="
                ml-2
                text-red-500 text-sm
              "
            >
              {formData}
            </p>
          )}
          <Button
            className="
              w-full
            "
          >
            Find Student
          </Button>
        </div>
      </form>

      {loading && (
        <p className="mt-5 text-center text-textSecondary">
          <div
            className="
            h-5
            w-5
            rounded-full
            border-2
            border-white
            border-t-transparent
            animate-spin
          "
          />
          Loading...
        </p>
      )}

      {/* Result */}
      <div>
        {showResults &&
          students.map((student) => (
            <div
              className="
              mt-6 p-4
              bg-background
              rounded-xl border border-border
              cursor-pointer
              transition-all
              duration-300
              hover:border-primary/40
             hover:bg-primaryLight/20
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
                  items-center justify-center
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
                    font-semibold text-textPrimary
                  "
                  >
                    {student.name}
                  </h3>

                  <p
                    className="
                    text-sm text-textSecondary
                  "
                  >
                    Class {student.classId.name}
                    {student.classId.section}
                  </p>
                </div>
              </div>

              <div
                className="
                mt-4
                text-sm text-textSecondary
              "
              >
                Admission No:{" "}
                <span
                  className="
                  font-medium text-textPrimary
                "
                >
                  {student.admissionNo}
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default StudentSearchCard;
