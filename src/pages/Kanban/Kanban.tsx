import Button from 'components/Button/Button';
import React from 'react';
import { FiEdit2, FiPlus } from 'react-icons/fi';

const Kanban: React.FC = () => {
  return (
    <main className="container">
      <header className="header">
        <div className="d-flex align-center">
          <h1 className="mr-18">f</h1>
          <Button icon={<FiEdit2 />} type="purple" className="mt-4" />
        </div>
        <div className="d-flex align-center">
          <Button icon={<FiPlus />} type="purple" size="small" className="mr-12">
            Invite
          </Button>
        </div>
      </header>
    </main>
  );
};

export default Kanban;
