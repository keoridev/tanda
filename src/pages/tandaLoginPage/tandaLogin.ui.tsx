import { AuthForm } from "~features/tandaAuth";
import { useTestResults } from "~features/tandaAuth/model/hooks/useTestResults";

export const TandaLogin = () => {
  const { data: testResults } = useTestResults();
  // В AuthForm добавьте:

  return (
    <div>
      <AuthForm testResults={testResults} />
    </div>
  );
};
