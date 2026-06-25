import ActiveNotices from "../../components/admin/notices/ActiveNotices";
import CreateNoticeCard from "../../components/admin/notices/CreateNoticeCard";
import NoticeStats from "../../components/admin/notices/NoticeStats";

const Notices = () => {
  return (
    <div>
      <div className="space-y-6">
        <NoticeStats />
        <div className="grid gap-6 lg:grid-cols-1">
          <CreateNoticeCard />
        </div>
        <ActiveNotices />
      </div>
    </div>
  );
};

export default Notices;
