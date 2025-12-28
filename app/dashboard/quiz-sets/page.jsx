import { getAllQuizzSets } from "@/queries/quizzes";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";



const QuizSets = async () => {
  const quizSets = await getAllQuizzSets()
  const mappedQuizzsets = quizSets.map(q => {
    return {
      id: q.id,
      title: q.title,
      isPublished: q.active,
      totalQuiz: q.quizIds.length
    }
  })
 
  return (
    <div className="p-6">
      <DataTable columns={columns} data={mappedQuizzsets} />
    </div>
  );
};

export default QuizSets;
