import React from "react";

const Container = props => <div className="dataset">{props.children}</div>;

const DatasetIntro = ({ name, description, picture }) => (
  <section className="dataset__intro">
    <h1>{name}</h1>
    <div>
      <h2>Description</h2>
      {description}
    </div>
    <table className="dataset__intro__table">
      <tr>
        <th>Title</th>
        <td>{name}</td>
      </tr>
      <tr>
        <th>Publisher</th>
        <td>
          ELI Beamlines, Institute of Physics of the Czech Academy of Sciences
        </td>
      </tr>
      <tr>
        <th>Author</th>
        <td>Dr. Mark Green</td>
      </tr>
      <tr>
        <th>Contact Email</th>
        <td>
          <a href="mailto:mark.green@eli-beams.eu">mark.green@eli-beams.eu</a>
        </td>
      </tr>
      <tr>
        <th>Public Access Level</th>
        <td>Public</td>
      </tr>
      <tr>
        <th>Citation</th>
        <td>
          Mark Green; (2016), Time-resolvent spectroscopy - run 1-52, DOI:
          110.7283/T5930R7W
        </td>
      </tr>
      <tr>
        <th>Dataset Identifier</th>
        <td>
          <a href="https://doi.org/10.7283/T5930R7W" about="_blank">
            https://doi.org/10.7283/T5930R7W
          </a>
        </td>
      </tr>
      <tr>
        <th>Category</th>
        <td>Time-resolvent spectroscopy</td>
      </tr>
      <tr>
        <th>Tags</th>
        <td>X-ray, Spectroscopy, Pulsed Radiolysis, ELI Beamlines</td>
      </tr>
    </table>
  </section>
);

const DatasetMeta = ({ picture }) => (
  <section>
    <h1>Dataset</h1>
    <table className="dataset__meta__table">
      <tr>
        <th>Date Created</th>
        <td>
          <strong>2019-03-15</strong> 21:58:32
        </td>
      </tr>
      <tr>
        <th>Last Update</th>
        <td>
          <strong>2019-05-02</strong> 11:23:15
        </td>
      </tr>
      <tr>
        <th>Views</th>
        <td>
          <strong>8</strong>
        </td>
      </tr>
      <tr>
        <th>Downloads</th>
        <td>
          <strong>1</strong>
        </td>
      </tr>
      <tr>
        <th>Size</th>
        <td>
          <strong>328 MB</strong>
        </td>
      </tr>
      <tr>
        <th>Files</th>
        <td>
          <strong>26</strong>
        </td>
      </tr>
    </table>
    <div className="dataset__meta__preview">
      <h2>Preview Visualization</h2>
      <img src={picture} alt="" />
    </div>
  </section>
);

const DatasetAnalysis = () => (
  <section className="dataset__analysis">
    <h1>Analysis</h1>
    <div className="dataset__analysis__existing">
      <h2>Existing Environments</h2>
      <ul>
        <li>
          <h3>Scattering - RUN 5</h3>
          Last Update: 2019-05-02 11:23:15
          <br />
          <strong>JupyterLab</strong> | Basic
        </li>
      </ul>
      <div>
        <a href="">Add to multi-dataset environment</a>
      </div>
    </div>
    <div className="dataset__analysis__spawner">
      <h2>JupyterLab Environments</h2>
      <div>
        <div>
          <strong>Basic</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
          </p>
        </div>
        <div>
          <strong>GPU Enabled</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
            <br />
            GPU
          </p>
        </div>
        <div>
          <strong>Cluster</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
            <br />
            Slurm Cluster
          </p>
        </div>
        <div>
          <strong>Custom</strong>
          <p>Configure your own Jupyter environment</p>
        </div>
      </div>
      <h2>Remote Desktop Environments</h2>
      <div>
        <div>
          <strong>Basic</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
          </p>
        </div>
        <div>
          <strong>GPU Enabled</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
            <br />
            GPU
          </p>
        </div>
        <div>
          <strong>Cluster</strong>
          <p>
            1 CPU
            <br />
            16 GB RAM
            <br />
            Slurm Cluster
          </p>
        </div>
        <div>
          <strong>Custom</strong>
          <p>Configure your own Remote Desktop environment</p>
        </div>
      </div>
    </div>
  </section>
);

export { Container, DatasetIntro, DatasetMeta, DatasetAnalysis };
