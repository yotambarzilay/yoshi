import React, { FC, useEffect } from 'react';
import { notifyViewFinishedLoading } from '@wix/business-manager-api';
import TodoList from '../src/TodoList';
import useFedops from '../../framework/hooks/useFedops';
import useExperiments from '../../framework/hooks/useExperiments';
import useTranslate from '../../framework/hooks/useTranslate';
import useSentry from '../../framework/hooks/useSentry';

const Todo: FC = () => {
  const fedops = useFedops();
  const Sentry = useSentry();
  const { enabled } = useExperiments();
  const t = useTranslate();

  useEffect(() => {
    fedops.appLoaded();
    notifyViewFinishedLoading('{%projectName%}.pages.index');
    console.log(Sentry);
  }, []);

  return (
    <div>
      <h1>{t('app.title')}</h1>
      {enabled('specs.yoshi.IsNew') ? 'A' : 'B'}
      <TodoList />
    </div>
  );
};

export default Todo;
