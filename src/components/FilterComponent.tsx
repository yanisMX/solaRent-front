const FilterComponent = () => {
  return (
    <div className={"text-white m-7"}>
      <p className={"text-2xl"}>Filtrer par </p>
      <ul className={"p-3"}>
        <li>
          <input
            type="radio"
            id="departement"
            name="departement"
            value="departement"
          />
          <label htmlFor="departement">Département</label>
        </li>
        <li>
          <input type="radio" id="region" name="region" value="region" />
          <label htmlFor="region">Région</label>
        </li>
        <li>
          <input type="radio" id="ville" name="ville" value="ville" />
          <label htmlFor="type">Ville</label>
        </li>
      </ul>
    </div>
  );
};
export default FilterComponent;
