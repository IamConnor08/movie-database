import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadCrumb({ currentPage }) {
  const pages = ['Home', 'Movies', 'TV Shows', 'People'];

  return (
    <Breadcrumb>
      {pages.map((page) => (
        <Breadcrumb.Item
          key={page}
          active={page === currentPage}
        >
          {page}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumb;
