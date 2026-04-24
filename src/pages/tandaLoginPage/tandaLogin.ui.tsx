import { AuthForm } from "~features/tandaAuth";
import { useTestResults } from "~features/tandaAuth/model/hooks/useTestResults";

export const TandaLogin = () => {
  const { data: testResults } = useTestResults();

  return (
    <div>
      <AuthForm testResults={testResults || undefined} />
    </div>
  );
};
  