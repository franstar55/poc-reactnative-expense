import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Transaccion } from "../types/tipos";
import { TransaccionesContext } from "../Context/TransaccionesContext";
import TransaccionItem from "../components/TransaccionItem";
import ListaVacia from "../components/ListaVacia";

const Inicio = ({ navigation }: any) => {

    const context = useContext(TransaccionesContext);  //context es el objeto que contiene las cosas que compartimos globalmente

    if (!context) {  //Si no pude encontrar el Context, muestro error 
        return <Text>Error: Context no disponible</Text>;
    }

    const transacciones = context.transacciones; //Accede a la propiedad transacciones dentro de context y la guarda en variable transacciones


    const getTotals = () => {

        return transacciones.reduce(  //reduce sirve para recorrer una lista y obtener un Unico resultado
            (total, transaccion) => {    //total objeto que vamos construyendo mientras recorremos las transacciones.

                if (transaccion.tipoMovimiento === "ingreso") {
                    total.ingresos += transaccion.monto;
                } else {
                    total.egresos += transaccion.monto;
                }

                total.balance = total.ingresos - total.egresos;

                return total;
            },
            {
                balance: 0,  //valor inicial
                ingresos: 0,
                egresos: 0
            }
        );
    };

//getTotals devuelve un solo objeto, y ese objeto tiene 3 propiedades/valores
    const { balance, ingresos, egresos } = getTotals(); //aca las asigna a c/u a una var


    // Mostrar solamente las últimas 5
    const transaccionesRecientes = [...transacciones]  //Copiá todos los elementos de transacciones en una lista nueva
        .reverse()  //da vuelta el orden y se queda con los ultimos 5
        .slice(0, 5);


    return (
        <View style={styles.container}>

            <Text style={styles.header}>Organizá tus gastos de forma simple y rápida</Text>


            <View style={styles.tarjetaGastos}>

                <Text style={styles.tituloBalance}>Balance</Text>

                <Text style={styles.balance}>
                    ${balance.toLocaleString("es-AR")} {/* mostrar el numero con formato de argentina*/}
                </Text>


                <View style={styles.containerDebeHaber}>

                    <View>
                        <Text style={styles.tituloMovimiento}>Ingresos</Text>

                        <Text style={styles.monto}>
                            ${ingresos.toLocaleString("es-AR")}
                        </Text>
                    </View>


                    <View>
                        <Text style={styles.tituloMovimiento}>Egresos</Text>

                        <Text style={styles.monto}>
                            ${egresos.toLocaleString("es-AR")}
                        </Text>
                    </View>

                </View>

            </View>


            <Text style={styles.tituloMedio}>Últimas Transacciones</Text>

{/* FlatList recibe un array de transaccionesRecientes y se encarga de recorrerlo y mostrarlo*/}
{/*en renderItem(propiedad de Flatlist) seleccionamos solo el item y no el index */}
{/* ABAJO le pasamos la transacción actual (item) a TransaccionItem mediante una prop.*/}

            <FlatList<Transaccion>            
                data={transaccionesRecientes}
                keyExtractor={(item) => item.id}  
                renderItem={({ item }) => (        
                    <TransaccionItem item={item} />
                )}
                ListEmptyComponent={<ListaVacia />}
            />

        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    header:{
        fontSize: 22,
        fontWeight:"bold",
        textAlign: "center",
        marginBottom: 30,
    },
    tituloBalance:{
        fontSize: 21,
        fontWeight: "bold",
        color: "#999999",
        textAlign:"center"
    },
    balance:{
        fontSize:30,
        fontWeight:"bold",
        color:"white",
        textAlign:"center"
    },
    tarjetaGastos:{
        padding:20,
        borderRadius:20,
        backgroundColor:"black",
    },
    containerDebeHaber:{
        padding:20,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    tituloMovimiento:{
        fontSize: 17,
        fontWeight: "bold",
        color: "#999999",
        textAlign:"center"
    },
    monto:{
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
        textAlign:"center",
    },
    tituloMedio:{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign:"left",
        padding:20,
    },

});

export default Inicio;