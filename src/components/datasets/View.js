import React from "react";
import { Link } from "react-router-dom";

const Container = props => <div className="datasets">{props.children}</div>;

const FilterList = props => (
  <section className="datasets__filters">
    <h1>Filters</h1>
    <ul className="nolist content">{props.children}</ul>
  </section>
);

const FilterListItem = ({ children, className, onClick, count }) => (
  <li
    onClick={onClick}
    className={"datasets__filters__item " + className}
    count={count}
  >
    {children}
    <span>{count}</span>
  </li>
);

const DatasetsList = props => (
  <section className="datasets__list">
    <h1>Documents</h1>
    <ul className="nolist">{props.children}</ul>
  </section>
);

const DatasetsListItemFilter = ({ name }) => (
  <div className="datasets__list__item__filters">{name}</div>
);

const DatasetsListItem = ({ id, name, description, img, children }) => (
  <li>
    <div className="datasets__list__item">
      <div
        className="datasets__list__item__img"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="datasets__list__item__main">
        <Link to={`dataset/${id}`}>
          <h2>{name}</h2>
        </Link>
        <div>{description}...</div>
        <div className="datasets__list__item__filters">{children}</div>
      </div>
      <div className="datasets__list__item__metadata">
        <div>
          Created 2020/29/1
          <br />
          Size 150 MB
          <br />
          Views 5
        </div>
        <div>
          <a href="">Jupyter Notebook</a>
        </div>
        <div>
          <a href="">Virtual Machine</a>
        </div>
      </div>
    </div>
  </li>
);

const About = () => (
  <section className="datasets__about">
    <h1>PaNOSC</h1>
    <div>
      <h2>The Photon and Neutron Open Science Cloud</h2>
      <p>
        The Photon and Neutron Open Science Cloud (PaNOSC) is a European project
        for making FAIR data a reality in 6 European Research Infrastructures
        (RIs), developing and providing services for scientific data and
        connecting these to the European Open Science Cloud (EOSC).
      </p>
      <h2>Objectives</h2>
      <ul className="list">
        <li>
          Participate in the construction of the EOSC by linking with the
          e-infrastructures and other ESFRI clusters.
        </li>
        <li>
          Make scientific data produced at Europe’s major Photon and Neutron
          sources fully compatible with the FAIR principles.
        </li>
        <li>
          Generalise the adoption of open data policies, standard metadata and
          data stewardship from 15 photon and neutron RIs and physics institutes
          across Europe
        </li>
        <li>
          Provide innovative data services to the users of these facilities
          locally and the scientific community at large via the European Open
          Science Cloud (EOSC).
        </li>
        <li>
          Increase the impact of RIs by ensuring data from user experiments can
          be used beyond the initial scope.
        </li>
        <li>
          Share the outcomes with the national RIs who are observers in the
          proposal and the community at large to promote the adoption of FAIR
          data principles, data stewardship and the EOSC.
        </li>
      </ul>
    </div>
  </section>
);

export {
  Container,
  FilterList,
  FilterListItem,
  DatasetsList,
  DatasetsListItem,
  DatasetsListItemFilter,
  About
};
