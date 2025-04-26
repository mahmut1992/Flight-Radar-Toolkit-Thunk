import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import c from "../utils/nullcheck";
import { open } from "../redux/slices/detailSlice";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const List = () => {
  const { isLoading, error, flights } = useSelector((store) => store.flight);
  const dispatch = useDispatch();

  // Kaçıncı elemandan itibaren gösterilecek

  const [start, setStart] = useState(0);

  // sayfa başına gösterilecek eleman sayısı
  const perPage = 13;

  // kaçıncı elemana kadar gösterilecek

  const end = start + perPage;

  // slice methodu ile ekrana basılacak elemanları al

  const currentFlights = flights.slice(start, end);

  // yeni sayfa seçilince start değeri güncelle

  const handlePage = (e) => {
    setStart(e.selected * 10);
  };

  return (
    <div className="list-container">
      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Kod</th>
            <th scope="col">Enlem</th>
            <th scope="col">Boylam</th>
            <th scope="col">Derece</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentFlights?.map((flight) => (
            <tr key={flight.id}>
              <th scope="row">{c(flight?.id)} </th>
              <td>{c(flight?.code)}</td>
              <td>{c(flight?.lat)}</td>
              <td>{c(flight?.lng)}</td>
              <td>{c(flight?.deg)}</td>

              <td>
                <button onClick={() => dispatch(open(flight?.id))}>
                  Detay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-wrapper">
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel="ileri >"
          onPageChange={handlePage}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(flights.length / perPage)}
          previousLabel="< geri"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default List;
