import { Helmet } from 'react-helmet-async';
// @mui
import { useEffect, useState } from 'react';
import { Grid, Container, Typography, Tooltip, Box } from '@mui/material';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import { getEnvois } from '../api/envoi';
import { getClients } from '../api/client';
import { getLivreurs } from '../api/livreur';
import { getAdmins } from '../api/admin';
import { getRamassages } from '../api/ramassage';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [envoi, setEnvoi] = useState([]);
  const [client, setClient] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [ramassage, setRamassage] = useState([]);

  // const [envoiCount, setEnvoiCount] = useState();
  // const [envoisDeposeCount, setEnvoisDeposeCount] = useState();
  // const [envoisEnRouteCount, setEnvoisEnRouteCount] = useState();
  // const [envoisEnAttenteCount, setEnvoisEnAttenteCount] = useState();
  // const [envoisLivreCount, setEnvoisLivreCount] = useState();
  // const [envoisRetourCount, setEnvoisRetourCount] = useState();

  useEffect(() => {
    getEnvois()
      .then((res) => {
        setEnvoi(res.data ? res.data : []);
      })

      .catch((err) => console.error(err));

    getLivreurs()
      .then((res) => {
        setLivreur(res.data ? res.data : []);
      })
      .catch((err) => console.error(err));

    getClients()
      .then((res) => {
        setClient(res.data ? res.data : []);
      })
      .catch((err) => console.error(err));

    getRamassages()
      .then((res) => {
        setRamassage(res.data ? res.data : []);
      })
      .catch((err) => console.error(err));

    getAdmins()
      .then((res) => {
        setAdmin(res.data ? res.data : []);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   Promise.all([getEnvois(), getEtats()])
  //     .then(([envoisRes, etatsRes]) => {
  //       const envois = envoisRes.data;
  //       const etats = etatsRes.data;

  //       const envoisDeposeCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Déposé';
  //       }).length;

  //       const envoisEnRouteCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'En Route';
  //       }).length;

  //       const envoisEnAttenteCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'En Attente';
  //       }).length;

  //       const envoisLivreCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Livrée';
  //       }).length;

  //       const envoisRetourCount = envois.filter((envoi) => {
  //         const lastEtat = envoi.etats[envoi.etats.length - 1];
  //         const etat = etats.find((e) => e._id === lastEtat.etat);
  //         return etat && etat.nom === 'Retour';
  //       }).length;

  //       setEnvoiCount(envois.length);

  //       setLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // Define count of Envois for each Etat

  // const envoicount = envoi ? envoi.length : 0;
  // const adminCount = admin ? admin.length : 0;
  // const clientCount = client ? client.length : 0;
  // const livreurCount = livreur ? livreur.length : 0;
  // const userCount = adminCount + clientCount + livreurCount;
  // const ramassageCount = ramassage ? ramassage.length : 0;

  // code : func who return count of etat
  const etatCount = (code) => {
    const status = [];
    const e = envoi.filter((e) => {
      let s =
        e.etats?.length > 0 &&
        e.etats.reduce((a, b) => {
          if (!b.date) return a;
          return a.date > b.date ? a : b;
        });

      if (e.etats.length > 0 && !s.date) s = e.etats.length > 0 && e.etats.find((e) => e.etat.code === 1);
      if (s.etat.code === code) status.push(s);
      return s.etat.code === code;
    });
    const sousetat = {};
    if (code === 3) {
      console.log(3);
      console.log(status);
      sousetat.versWilaya = status.filter((s) => s.sousetat?.name === 'Vers Wilaya').length || '0';
      sousetat.hubWilaya = status.filter((s) => s.sousetat?.name === 'HUB Wilaya').length || '0';
      sousetat.sortieLivraison = status.filter((s) => s.sousetat?.name === 'Sortie de Livraison').length || '0';
    }

    if (code === 4) {
      sousetat.nrp = status.filter((s) => ['NRP1', 'NRP2', 'NRP3'].includes(s.sousetat?.name)).length || '0';
      sousetat.reporte = status.filter((s) => s.sousetat?.name === 'Reporté').length || '0';
    }

    if (code === 6) {
      sousetat.transit = status.filter((s) => s.sousetat?.name === 'En Transit').length || '0';
      sousetat.arrive = status.filter((s) => s.sousetat?.name === 'Arrivé').length || '0';
    }
    return { count: e.length || '0', sousetat };
  };

  const ramassageCount = (index) => {
    const status = ['Nouveau', 'Valider', 'Terminer'];
    return ramassage.filter((e) => e?.status === status[index]).length || '0';
  };

  

  return (
    <>
      <Helmet>
        <title> Admin BackOffice </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back to your back office
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Shipments"
              total={envoi.length || '0'}
              icon={'streamline:shipping-box-1-box-package-label-delivery-shipment-shipping'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Envois Déposés" total={etatCount(2).count} icon={'mdi:package-delivered'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Tooltip
              followCursor
              title={
                <span style={{ whiteSpace: 'pre-line' }}>{`Vers Wilaya : ${
                  etatCount(3).sousetat?.versWilaya
                } \n HUB Wilaya : ${etatCount(3).sousetat?.hubWilaya} \n Sortie de livraison : ${
                  etatCount(3).sousetat?.sortieLivraison
                }`}</span>
              }
            >
              <Box>
                <AppWidgetSummary total={etatCount(3).count} title="Envois en Route" icon={'twemoji:delivery-truck'} />
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Tooltip
              followCursor
              title={
                <span style={{ whiteSpace: 'pre-line' }}>{`NRP : ${etatCount(4).sousetat?.nrp} \n Reporté : ${
                  etatCount(4).sousetat?.reporte
                }`}</span>
              }
            >
              <Box>
                <AppWidgetSummary
                  title="Envois En Attente"
                  total={etatCount(4).count}
                  icon={'material-symbols:pending'}
                />
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Envois Livrés"
              total={etatCount(5).count}
              subtitle={''}
              icon={'mdi:package-variant-closed-delivered'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Tooltip
              followCursor
              title={
                <span style={{ whiteSpace: 'pre-line' }}>{`En Transit : ${etatCount(6).sousetat?.transit} \n Arrivé : ${
                  etatCount(6).sousetat?.arrive
                }`}</span>
              }
            >
              <Box>
                <AppWidgetSummary title="Envois Retour" total={etatCount(6).count} icon={'tabler:truck-return'} />
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Pickups"
              total={ramassage.length || '0'}
              color="info"
              icon={'game-icons:card-pickup'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Clients"
              total={client.length || '0'}
              color="warning"
              icon={'raphael:customer'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Delivery Agents"
              total={livreur.length || '0'}
              color="error"
              icon={'openmoji:delivery-truck'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Admins" total={admin.length || '0'} color="error" icon={'eos-icons:admin'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Users"
              total={client.length + admin.length + livreur.length || '0'}
              color="info"
              icon={'mdi:user-group'}
            />
          </Grid>

          
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Pickups"
              total={ramassageCount(0)}
              color="success"
              icon={'game-icons:card-pickup'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pickups validés"
              total={ramassageCount(1)}
              color="success"
              icon={'game-icons:card-pickup'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pickups terminer"
              total={ramassageCount(2)}
              color="success"
              icon={'game-icons:card-pickup'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
