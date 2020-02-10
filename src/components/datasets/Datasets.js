import React, { useState } from "react";
import { useFetch } from "../../utils";
import {
  Container,
  FilterList,
  FilterListItem,
  DatasetsList,
  DatasetsListItem,
  DatasetsListItemFilter,
  About
} from "./View";
import Loading from "../loading";

const Datasets = () => {
  const { data: filterData, isLoading: isFilterLoading } = useFetch("filters");
  const { data: datasetData, isLoading: isDatasetLoading } = useFetch(
    "datasets"
  );

  const [selectedFilters, setSelectedFilters] = useState([]);
  const clickFilter = filterId => {
    const removeFilter = selectedFilters.filter(f => f !== filterId);
    selectedFilters.includes(filterId)
      ? setSelectedFilters(removeFilter)
      : setSelectedFilters([filterId]);
    // setSelectedFilters([...selectedFilters, filterId]);
  };

  const reduceBySelectedFilters = (dataset, filters) => {
    const datasetsFilters = dataset.filters
      .map(t => t.id)
      .reduce((acc, item) => [...acc, item], []);
    return filters.every(ff => datasetsFilters.includes(ff));
  };

  const countDatasetsPerFilter = (filterId, datasets) => {
    const count = datasets
      .filter(d => d.filters.map(m => m.id).includes(filterId))
      .reduce(acc => acc + 1, 0);
    return count;
  };

  const getFilterById = (datasetsFilters, allFilters) => {
    const datasetsFiltersIds = datasetsFilters
      .map(d => d.id)
      .reduce((acc, item) => [...acc, item], []);
    return allFilters.filter(g => datasetsFiltersIds.includes(g.id));
  };

  return (
    <Container>
      {isFilterLoading ? (
        <Loading />
      ) : (
        <FilterList>
          {filterData.map(fi => (
            <FilterListItem
              key={fi.id}
              id={fi.id}
              onClick={() => clickFilter(fi.id)}
              className={
                selectedFilters.includes(fi.id)
                  ? "datasets__filters__item--active"
                  : ""
              }
              count={countDatasetsPerFilter(fi.id, datasetData)}
            >
              {fi.name}
            </FilterListItem>
          ))}
        </FilterList>
      )}
      {isDatasetLoading ? (
        <Loading />
      ) : (
        <DatasetsList>
          {datasetData
            .filter(d => reduceBySelectedFilters(d, selectedFilters))
            .map(d => (
              <DatasetsListItem
                key={d.id}
                id={d.id}
                name={d.name}
                description={d.description.substring(0, 200).trim()}
                img={d.img}
              >
                {getFilterById(d.filters, filterData).map(n => (
                  <DatasetsListItemFilter key={n.id} name={n.name} />
                ))}
              </DatasetsListItem>
            ))}
        </DatasetsList>
      )}
      <About />
    </Container>
  );
};

export default Datasets;
